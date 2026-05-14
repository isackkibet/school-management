import prisma from '../config/database.js'
import { AppError } from '../middleware/errorHandler.js'
import { paginate, generateStudentId } from '../utils/helpers.js'
import bcrypt from 'bcryptjs'

export const createStudent = async (req, res, next) => {
  try {
    const {
      userId,
      email,
      password,
      firstName,
      lastName,
      phone,
      address,
      dateOfBirth,
      gender,
      studentId,
      classId,
      guardianName,
      guardianPhone,
    } = req.body

    const classData = await prisma.class.findUnique({ where: { id: classId } })
    if (!classData) throw new AppError('Class not found.', 404)

    const count = await prisma.studentProfile.count()
    const admissionNumber = studentId || generateStudentId(classData.name.slice(0, 3).toUpperCase(), count + 1)

    const student = await prisma.$transaction(async (tx) => {
      let studentUser

      if (userId) {
        studentUser = await tx.user.findUnique({ where: { id: userId } })
        if (!studentUser) throw new AppError('User not found.', 404)
        if (studentUser.role !== 'STUDENT') throw new AppError('User must have STUDENT role.', 400)

        const already = await tx.studentProfile.findUnique({ where: { userId } })
        if (already) throw new AppError('Student profile already exists.', 409)
      } else {
        const exists = await tx.user.findUnique({ where: { email } })
        if (exists) throw new AppError('Email already taken.', 409)

        studentUser = await tx.user.create({
          data: {
            email,
            password: await bcrypt.hash(password || 'student123', 12),
            role: 'STUDENT',
            firstName,
            lastName,
            phone,
            address,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
            gender,
          },
        })
      }

      const admissionTaken = await tx.studentProfile.findUnique({ where: { studentId: admissionNumber } })
      if (admissionTaken) throw new AppError('Admission number already exists.', 409)

      return tx.studentProfile.create({
        data: {
          userId: studentUser.id,
          studentId: admissionNumber,
          classId,
          guardianName,
          guardianPhone,
        },
        include: {
          user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true, address: true, dateOfBirth: true, gender: true } },
          class: true,
          feePayments: { include: { fee: true } },
        },
      })
    })

    res.status(201).json({ success: true, data: student })
  } catch (error) {
    next(error)
  }
}

export const getAllStudents = async (req, res, next) => {
  try {
    const { page, limit, search, classId } = req.query
    const { skip, take } = paginate(page, limit)

    const where = {}
    if (classId) where.classId = classId
    if (search) {
      where.OR = [
        { studentId: { contains: search } },
        { user: { firstName: { contains: search } } },
        { user: { lastName: { contains: search } } },
      ]
    }

    const [students, total] = await Promise.all([
      prisma.studentProfile.findMany({
        where,
        skip,
        take,
        include: {
          user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true, address: true, dateOfBirth: true, gender: true, isActive: true } },
          class: true,
          feePayments: { include: { fee: true } },
          _count: { select: { attendance: true, examResults: true, feePayments: true } },
        },
        orderBy: { enrollmentDate: 'desc' },
      }),
      prisma.studentProfile.count({ where }),
    ])

    res.json({
      success: true,
      data: students,
      pagination: { page: parseInt(page) || 1, limit: take, total, totalPages: Math.ceil(total / take) },
    })
  } catch (error) {
    next(error)
  }
}

export const getStudentById = async (req, res, next) => {
  try {
    const student = await prisma.studentProfile.findUnique({
      where: { id: req.params.id },
      include: {
        user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true, address: true, dateOfBirth: true, gender: true, isActive: true } },
        class: { include: { subjects: true } },
        attendance: { include: { class: true }, orderBy: { date: 'desc' } },
        examResults: { include: { exam: { include: { subject: true } } } },
        feePayments: { include: { fee: true } },
      },
    })
    if (!student) throw new AppError('Student not found.', 404)

    res.json({ success: true, data: student })
  } catch (error) {
    next(error)
  }
}

export const updateStudent = async (req, res, next) => {
  try {
    const {
      classId,
      firstName,
      lastName,
      phone,
      address,
      dateOfBirth,
      gender,
      guardianName,
      guardianPhone,
    } = req.body

    if (classId) {
      const c = await prisma.class.findUnique({ where: { id: classId } })
      if (!c) throw new AppError('Class not found.', 404)
    }

    const student = await prisma.$transaction(async (tx) => {
      const existing = await tx.studentProfile.findUnique({ where: { id: req.params.id } })
      if (!existing) throw new AppError('Student not found.', 404)

      const userUpdates = {}
      if (firstName !== undefined) userUpdates.firstName = firstName
      if (lastName !== undefined) userUpdates.lastName = lastName
      if (phone !== undefined) userUpdates.phone = phone
      if (address !== undefined) userUpdates.address = address
      if (dateOfBirth !== undefined) userUpdates.dateOfBirth = dateOfBirth ? new Date(dateOfBirth) : null
      if (gender !== undefined) userUpdates.gender = gender

      if (Object.keys(userUpdates).length > 0) {
        await tx.user.update({ where: { id: existing.userId }, data: userUpdates })
      }

      return tx.studentProfile.update({
        where: { id: req.params.id },
        data: {
          ...(classId && { classId }),
          ...(guardianName !== undefined && { guardianName }),
          ...(guardianPhone !== undefined && { guardianPhone }),
        },
        include: {
          user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true, address: true, dateOfBirth: true, gender: true, isActive: true } },
          class: true,
          feePayments: { include: { fee: true } },
          _count: { select: { attendance: true, examResults: true, feePayments: true } },
        },
      })
    })

    res.json({ success: true, data: student })
  } catch (error) {
    next(error)
  }
}

export const deleteStudent = async (req, res, next) => {
  try {
    const student = await prisma.studentProfile.findUnique({ where: { id: req.params.id } })
    if (!student) throw new AppError('Student not found.', 404)

    await prisma.$transaction(async (tx) => {
      await tx.studentProfile.delete({ where: { id: req.params.id } })
      await tx.user.update({
        where: { id: student.userId },
        data: { isActive: false },
      })
    })

    res.json({ success: true, message: 'Student deleted and account deactivated.' })
  } catch (error) {
    if (error.code === 'P2025') return next(new AppError('Student not found.', 404))
    next(error)
  }
}

export const bulkCreateStudents = async (req, res, next) => {
  try {
    const { students } = req.body
    if (!Array.isArray(students) || students.length === 0) {
      throw new AppError('Provide a non-empty array of students.', 400)
    }

    const created = await prisma.$transaction(async (tx) => {
      const results = []
      for (const s of students) {
        const {
          email, password, firstName, lastName, phone, address,
          dateOfBirth, gender, classId, studentId, guardianName, guardianPhone,
        } = s

        if (!email || !firstName || !lastName) {
          throw new AppError(`Missing required fields for student: ${email || 'unknown'}`, 400)
        }

        const exists = await tx.user.findUnique({ where: { email } })
        if (exists) throw new AppError(`Email ${email} already taken.`, 409)

        if (classId) {
          const c = await tx.class.findUnique({ where: { id: classId } })
          if (!c) throw new AppError(`Class ${classId} not found for ${email}.`, 404)
        }

        const count = await tx.studentProfile.count()
        const admissionNumber = studentId || generateStudentId('GEN', count + 1)

        const admissionTaken = await tx.studentProfile.findUnique({ where: { studentId: admissionNumber } })
        if (admissionTaken) throw new AppError(`Admission number ${admissionNumber} already exists.`, 409)

        const newUser = await tx.user.create({
          data: {
            email,
            password: await bcrypt.hash(password || 'student123', 12),
            role: 'STUDENT',
            firstName,
            lastName,
            phone,
            address,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
            gender,
          },
        })

        const profile = await tx.studentProfile.create({
          data: {
            userId: newUser.id,
            studentId: admissionNumber,
            ...(classId && { classId }),
            guardianName,
            guardianPhone,
          },
          include: {
            user: { select: { id: true, firstName: true, lastName: true, email: true } },
            class: true,
          },
        })

        results.push(profile)
      }
      return results
    })

    res.status(201).json({ success: true, data: created, count: created.length })
  } catch (error) {
    next(error)
  }
}

export const assignStudentClass = async (req, res, next) => {
  try {
    const { classId } = req.body

    const c = await prisma.class.findUnique({ where: { id: classId } })
    if (!c) throw new AppError('Class not found.', 404)

    const student = await prisma.studentProfile.findUnique({ where: { id: req.params.id } })
    if (!student) throw new AppError('Student not found.', 404)

    const updated = await prisma.studentProfile.update({
      where: { id: req.params.id },
      data: { classId },
      include: {
        user: { select: { id: true, firstName: true, lastName: true, email: true } },
        class: true,
      },
    })

    res.json({ success: true, data: updated })
  } catch (error) {
    next(error)
  }
}

export const toggleStudentStatus = async (req, res, next) => {
  try {
    const { isActive } = req.body

    const student = await prisma.studentProfile.findUnique({ where: { id: req.params.id } })
    if (!student) throw new AppError('Student not found.', 404)

    const user = await prisma.user.update({
      where: { id: student.userId },
      data: { isActive },
      select: { id: true, isActive: true },
    })

    res.json({ success: true, data: { userId: user.id, isActive: user.isActive } })
  } catch (error) {
    next(error)
  }
}

export const getUnassignedStudents = async (req, res, next) => {
  try {
    const { page, limit } = req.query
    const { skip, take } = paginate(page, limit)

    const where = { classId: null }

    const [students, total] = await Promise.all([
      prisma.studentProfile.findMany({
        where,
        skip,
        take,
        include: {
          user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true, isActive: true } },
        },
        orderBy: { enrollmentDate: 'desc' },
      }),
      prisma.studentProfile.count({ where }),
    ])

    res.json({
      success: true,
      data: students,
      pagination: { page: parseInt(page) || 1, limit: take, total, totalPages: Math.ceil(total / take) },
    })
  } catch (error) {
    next(error)
  }
}
