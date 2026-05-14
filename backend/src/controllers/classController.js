import prisma from '../config/database.js'
import { AppError } from '../middleware/errorHandler.js'
import { paginate } from '../utils/helpers.js'

export const createClass = async (req, res, next) => {
  try {
    const { name, section, room } = req.body
    const classData = await prisma.class.create({
      data: { name, section, room },
      include: { _count: { select: { students: true, subjects: true } } },
    })
    res.status(201).json({ success: true, data: classData })
  } catch (error) {
    next(error)
  }
}

export const getAllClasses = async (req, res, next) => {
  try {
    const { page, limit } = req.query
    const { skip, take } = paginate(page, limit)

    const [classes, total] = await Promise.all([
      prisma.class.findMany({
        skip,
        take,
        include: {
          classTeacher: { include: { user: { select: { firstName: true, lastName: true } } } },
          _count: { select: { students: true, subjects: true, exams: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.class.count(),
    ])

    res.json({
      success: true,
      data: classes,
      pagination: { page: parseInt(page) || 1, limit: take, total, totalPages: Math.ceil(total / take) },
    })
  } catch (error) {
    next(error)
  }
}

export const getClassById = async (req, res, next) => {
  try {
    const classData = await prisma.class.findUnique({
      where: { id: req.params.id },
      include: {
        classTeacher: { include: { user: { select: { firstName: true, lastName: true } } } },
        students: { include: { user: { select: { firstName: true, lastName: true, email: true } } } },
        subjects: { include: { teacher: { include: { user: { select: { firstName: true, lastName: true } } } } } },
      },
    })
    if (!classData) throw new AppError('Class not found.', 404)
    res.json({ success: true, data: classData })
  } catch (error) {
    next(error)
  }
}

export const updateClass = async (req, res, next) => {
  try {
    const classData = await prisma.class.update({
      where: { id: req.params.id },
      data: req.body,
    })
    res.json({ success: true, data: classData })
  } catch (error) {
    if (error.code === 'P2025') return next(new AppError('Class not found.', 404))
    next(error)
  }
}

export const deleteClass = async (req, res, next) => {
  try {
    await prisma.class.delete({ where: { id: req.params.id } })
    res.json({ success: true, message: 'Class deleted.' })
  } catch (error) {
    if (error.code === 'P2025') return next(new AppError('Class not found.', 404))
    next(error)
  }
}
