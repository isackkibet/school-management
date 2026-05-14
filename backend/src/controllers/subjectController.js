import prisma from '../config/database.js'
import { AppError } from '../middleware/errorHandler.js'
import { paginate } from '../utils/helpers.js'

export const createSubject = async (req, res, next) => {
  try {
    const { name, code, classId } = req.body

    const classData = await prisma.class.findUnique({ where: { id: classId } })
    if (!classData) throw new AppError('Class not found.', 404)

    const subject = await prisma.subject.create({
      data: { name, code, classId },
      include: { class: true },
    })
    res.status(201).json({ success: true, data: subject })
  } catch (error) {
    next(error)
  }
}

export const getAllSubjects = async (req, res, next) => {
  try {
    const { page, limit, classId } = req.query
    const { skip, take } = paginate(page, limit)

    const where = {}
    if (classId) where.classId = classId

    const [subjects, total] = await Promise.all([
      prisma.subject.findMany({
        where,
        skip,
        take,
        include: { class: true, teacher: { include: { user: { select: { firstName: true, lastName: true } } } } },
        orderBy: { name: 'asc' },
      }),
      prisma.subject.count({ where }),
    ])

    res.json({
      success: true,
      data: subjects,
      pagination: { page: parseInt(page) || 1, limit: take, total, totalPages: Math.ceil(total / take) },
    })
  } catch (error) {
    next(error)
  }
}

export const getSubjectById = async (req, res, next) => {
  try {
    const subject = await prisma.subject.findUnique({
      where: { id: req.params.id },
      include: { class: true, teacher: { include: { user: { select: { firstName: true, lastName: true } } } } },
    })
    if (!subject) throw new AppError('Subject not found.', 404)
    res.json({ success: true, data: subject })
  } catch (error) {
    next(error)
  }
}

export const updateSubject = async (req, res, next) => {
  try {
    const subject = await prisma.subject.update({
      where: { id: req.params.id },
      data: req.body,
    })
    res.json({ success: true, data: subject })
  } catch (error) {
    if (error.code === 'P2025') return next(new AppError('Subject not found.', 404))
    next(error)
  }
}

export const deleteSubject = async (req, res, next) => {
  try {
    await prisma.subject.delete({ where: { id: req.params.id } })
    res.json({ success: true, message: 'Subject deleted.' })
  } catch (error) {
    if (error.code === 'P2025') return next(new AppError('Subject not found.', 404))
    next(error)
  }
}
