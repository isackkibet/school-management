import prisma from '../config/database.js'
import { AppError } from '../middleware/errorHandler.js'
import { paginate } from '../utils/helpers.js'

export const createExam = async (req, res, next) => {
  try {
    const { name, classId, subjectId, date, totalMarks, passMarks } = req.body

    const [classData, subject] = await Promise.all([
      prisma.class.findUnique({ where: { id: classId } }),
      prisma.subject.findUnique({ where: { id: subjectId } }),
    ])
    if (!classData) throw new AppError('Class not found.', 404)
    if (!subject) throw new AppError('Subject not found.', 404)
    if (subject.classId !== classId) throw new AppError('Subject not in this class.', 400)

    const exam = await prisma.exam.create({
      data: { name, classId, subjectId, date: new Date(date), totalMarks, passMarks },
      include: { class: true, subject: true },
    })

    res.status(201).json({ success: true, data: exam })
  } catch (error) {
    next(error)
  }
}

export const getAllExams = async (req, res, next) => {
  try {
    const { page, limit, classId, subjectId } = req.query
    const { skip, take } = paginate(page, limit)

    const where = {}
    if (classId) where.classId = classId
    if (subjectId) where.subjectId = subjectId

    const [exams, total] = await Promise.all([
      prisma.exam.findMany({
        where,
        skip,
        take,
        include: { class: true, subject: true, _count: { select: { results: true } } },
        orderBy: { date: 'desc' },
      }),
      prisma.exam.count({ where }),
    ])

    res.json({
      success: true,
      data: exams,
      pagination: { page: parseInt(page) || 1, limit: take, total, totalPages: Math.ceil(total / take) },
    })
  } catch (error) {
    next(error)
  }
}

export const getExamById = async (req, res, next) => {
  try {
    const exam = await prisma.exam.findUnique({
      where: { id: req.params.id },
      include: {
        class: true,
        subject: true,
        results: {
          include: { student: { include: { user: { select: { firstName: true, lastName: true } } } } },
          orderBy: { marksObtained: 'desc' },
        },
      },
    })
    if (!exam) throw new AppError('Exam not found.', 404)

    res.json({ success: true, data: exam })
  } catch (error) {
    next(error)
  }
}

export const updateExam = async (req, res, next) => {
  try {
    const exam = await prisma.exam.update({
      where: { id: req.params.id },
      data: { ...req.body, ...(req.body.date && { date: new Date(req.body.date) }) },
      include: { class: true, subject: true },
    })

    res.json({ success: true, data: exam })
  } catch (error) {
    if (error.code === 'P2025') return next(new AppError('Exam not found.', 404))
    next(error)
  }
}

export const deleteExam = async (req, res, next) => {
  try {
    await prisma.exam.delete({ where: { id: req.params.id } })
    res.json({ success: true, message: 'Exam deleted.' })
  } catch (error) {
    if (error.code === 'P2025') return next(new AppError('Exam not found.', 404))
    next(error)
  }
}

// TODO: maybe move grade calc to a separate util
const calculateGrade = (marks, totalMarks, passMarks) => {
  const pct = (marks / totalMarks) * 100
  if (marks < passMarks) return 'F'
  if (pct >= 90) return 'A+'
  if (pct >= 80) return 'A'
  if (pct >= 70) return 'B'
  if (pct >= 60) return 'C'
  if (pct >= 50) return 'D'
  return 'E'
}

export const recordResults = async (req, res, next) => {
  try {
    const { examId } = req.params
    const { results } = req.body

    const exam = await prisma.exam.findUnique({ where: { id: examId } })
    if (!exam) throw new AppError('Exam not found.', 404)

    const created = []
    for (const result of results) {
      if (result.marksObtained > exam.totalMarks) {
        throw new AppError(`Marks ${result.marksObtained} exceed max ${exam.totalMarks} for student ${result.studentId}.`, 400)
      }

      const grade = calculateGrade(result.marksObtained, exam.totalMarks, exam.passMarks)

      const examResult = await prisma.examResult.upsert({
        where: { examId_studentId: { examId, studentId: result.studentId } },
        update: { marksObtained: result.marksObtained, grade },
        create: { examId, studentId: result.studentId, marksObtained: result.marksObtained, grade },
        include: { student: { include: { user: { select: { firstName: true, lastName: true } } } } },
      })
      created.push(examResult)
    }

    res.status(201).json({ success: true, data: created, message: `Recorded ${created.length} results.` })
  } catch (error) {
    next(error)
  }
}
