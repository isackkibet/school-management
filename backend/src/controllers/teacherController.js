import prisma from '../config/database.js'
import { AppError } from '../middleware/errorHandler.js'
import { paginate, generateTeacherId } from '../utils/helpers.js'

export const createTeacher = async (req, res, next) => {
  try {
    const { userId, qualification, specialization } = req.body

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw new AppError('User not found.', 404)
    if (user.role !== 'TEACHER') throw new AppError('User must have TEACHER role.', 400)

    const existing = await prisma.teacherProfile.findUnique({ where: { userId } })
    if (existing) throw new AppError('Teacher profile already exists.', 409)

    const count = await prisma.teacherProfile.count()
    const teacherId = generateTeacherId(count + 1)

    const teacher = await prisma.teacherProfile.create({
      data: { userId, teacherId, qualification, specialization },
      include: { user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true } } },
    })

    res.status(201).json({ success: true, data: teacher })
  } catch (error) {
    next(error)
  }
}

export const getAllTeachers = async (req, res, next) => {
  try {
    const { page, limit, search } = req.query
    const { skip, take } = paginate(page, limit)

    const where = {}
    if (search) {
      where.OR = [
        { teacherId: { contains: search } },
        { user: { firstName: { contains: search } } },
        { user: { lastName: { contains: search } } },
      ]
    }

    const [teachers, total] = await Promise.all([
      prisma.teacherProfile.findMany({
        where,
        skip,
        take,
        include: {
          user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true, gender: true, isActive: true } },
          _count: { select: { classes: true, subjects: true } },
        },
        orderBy: { joinDate: 'desc' },
      }),
      prisma.teacherProfile.count({ where }),
    ])

    res.json({
      success: true,
      data: teachers,
      pagination: { page: parseInt(page) || 1, limit: take, total, totalPages: Math.ceil(total / take) },
    })
  } catch (error) {
    next(error)
  }
}

export const getTeacherById = async (req, res, next) => {
  try {
    const teacher = await prisma.teacherProfile.findUnique({
      where: { id: req.params.id },
      include: {
        user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true, address: true, gender: true, isActive: true } },
        classes: true,
        subjects: { include: { class: true } },
      },
    })
    if (!teacher) throw new AppError('Teacher not found.', 404)

    res.json({ success: true, data: teacher })
  } catch (error) {
    next(error)
  }
}

export const updateTeacher = async (req, res, next) => {
  try {
    const teacher = await prisma.teacherProfile.update({
      where: { id: req.params.id },
      data: req.body,
      include: { user: { select: { id: true, firstName: true, lastName: true, email: true } } },
    })

    res.json({ success: true, data: teacher })
  } catch (error) {
    if (error.code === 'P2025') return next(new AppError('Teacher not found.', 404))
    next(error)
  }
}

export const deleteTeacher = async (req, res, next) => {
  try {
    await prisma.teacherProfile.delete({ where: { id: req.params.id } })
    res.json({ success: true, message: 'Teacher deleted.' })
  } catch (error) {
    if (error.code === 'P2025') return next(new AppError('Teacher not found.', 404))
    next(error)
  }
}

export const assignClass = async (req, res, next) => {
  try {
    const { teacherId, classId } = req.body

    const teacher = await prisma.teacherProfile.findUnique({ where: { id: teacherId } })
    if (!teacher) throw new AppError('Teacher not found.', 404)

    const cls = await prisma.class.findUnique({ where: { id: classId } })
    if (!cls) throw new AppError('Class not found.', 404)

    const updated = await prisma.class.update({
      where: { id: classId },
      data: { classTeacherId: teacherId },
      include: { classTeacher: { include: { user: { select: { firstName: true, lastName: true } } } } },
    })

    res.json({ success: true, data: updated })
  } catch (error) {
    next(error)
  }
}

export const assignSubject = async (req, res, next) => {
  try {
    const { teacherId, subjectId } = req.body

    const teacher = await prisma.teacherProfile.findUnique({ where: { id: teacherId } })
    if (!teacher) throw new AppError('Teacher not found.', 404)

    const subj = await prisma.subject.findUnique({ where: { id: subjectId } })
    if (!subj) throw new AppError('Subject not found.', 404)

    const updated = await prisma.subject.update({
      where: { id: subjectId },
      data: { teacherId },
      include: { teacher: { include: { user: { select: { firstName: true, lastName: true } } } }, class: true },
    })

    res.json({ success: true, data: updated })
  } catch (error) {
    next(error)
  }
}
