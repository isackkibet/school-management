import prisma from '../config/database.js'
import { AppError } from '../middleware/errorHandler.js'
import { paginate, generateStudentId } from '../utils/helpers.js'

export const createStudent = async (req, res, next) => {
  try {
    const { userId, classId, guardianName, guardianPhone } = req.body

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw new AppError('User not found.', 404)
    if (user.role !== 'STUDENT') throw new AppError('User must have STUDENT role.', 400)

    const already = await prisma.studentProfile.findUnique({ where: { userId } })
    if (already) throw new AppError('Student profile already exists.', 409)

    const classData = await prisma.class.findUnique({ where: { id: classId } })
    if (!classData) throw new AppError('Class not found.', 404)

    const count = await prisma.studentProfile.count()
    const studentId = generateStudentId(classData.name.slice(0, 3).toUpperCase(), count + 1)

    const student = await prisma.studentProfile.create({
      data: { userId, studentId, classId, guardianName, guardianPhone },
      include: { user: { select: { id: true, firstName: true, lastName: true, email: true, gender: true } }, class: true },
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
          user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true, gender: true, isActive: true } },
          class: true,
          _count: { select: { attendance: true, examResults: true, feePayments: true } },
        },
        orderBy: { createdAt: 'desc' },
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
    const { classId, guardianName, guardianPhone } = req.body

    if (classId) {
      const c = await prisma.class.findUnique({ where: { id: classId } })
      if (!c) throw new AppError('Class not found.', 404)
    }

    const student = await prisma.studentProfile.update({
      where: { id: req.params.id },
      data: {
        ...(classId && { classId }),
        ...(guardianName !== undefined && { guardianName }),
        ...(guardianPhone !== undefined && { guardianPhone }),
      },
      include: { user: { select: { id: true, firstName: true, lastName: true, email: true } }, class: true },
    })

    res.json({ success: true, data: student })
  } catch (error) {
    if (error.code === 'P2025') return next(new AppError('Student not found.', 404))
    next(error)
  }
}

export const deleteStudent = async (req, res, next) => {
  try {
    await prisma.studentProfile.delete({ where: { id: req.params.id } })
    res.json({ success: true, message: 'Student deleted.' })
  } catch (error) {
    if (error.code === 'P2025') return next(new AppError('Student not found.', 404))
    next(error)
  }
}
