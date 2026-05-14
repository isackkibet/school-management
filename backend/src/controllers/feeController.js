import prisma from '../config/database.js'
import { AppError } from '../middleware/errorHandler.js'
import { paginate } from '../utils/helpers.js'

export const createFee = async (req, res, next) => {
  try {
    const { name, amount, classId, dueDate, academicYear } = req.body

    const cls = await prisma.class.findUnique({ where: { id: classId } })
    if (!cls) throw new AppError('Class not found.', 404)

    const fee = await prisma.fee.create({
      data: { name, amount, classId, dueDate: new Date(dueDate), academicYear },
      include: { class: true },
    })

    res.status(201).json({ success: true, data: fee })
  } catch (error) {
    next(error)
  }
}

export const getAllFees = async (req, res, next) => {
  try {
    const { page, limit, classId, academicYear } = req.query
    const { skip, take } = paginate(page, limit)

    const where = {}
    if (classId) where.classId = classId
    if (academicYear) where.academicYear = academicYear

    const [fees, total] = await Promise.all([
      prisma.fee.findMany({
        where,
        skip,
        take,
        include: { class: true, _count: { select: { payments: true } } },
        orderBy: { dueDate: 'desc' },
      }),
      prisma.fee.count({ where }),
    ])

    res.json({
      success: true,
      data: fees,
      pagination: { page: parseInt(page) || 1, limit: take, total, totalPages: Math.ceil(total / take) },
    })
  } catch (error) {
    next(error)
  }
}

export const getFeeById = async (req, res, next) => {
  try {
    const fee = await prisma.fee.findUnique({
      where: { id: req.params.id },
      include: {
        class: true,
        payments: {
          include: { student: { include: { user: { select: { firstName: true, lastName: true } } } } },
        },
      },
    })
    if (!fee) throw new AppError('Fee not found.', 404)

    res.json({ success: true, data: fee })
  } catch (error) {
    next(error)
  }
}

export const updateFee = async (req, res, next) => {
  try {
    const fee = await prisma.fee.update({
      where: { id: req.params.id },
      data: { ...req.body, ...(req.body.dueDate && { dueDate: new Date(req.body.dueDate) }) },
      include: { class: true },
    })

    res.json({ success: true, data: fee })
  } catch (error) {
    if (error.code === 'P2025') return next(new AppError('Fee not found.', 404))
    next(error)
  }
}

export const deleteFee = async (req, res, next) => {
  try {
    await prisma.fee.delete({ where: { id: req.params.id } })
    res.json({ success: true, message: 'Fee deleted.' })
  } catch (error) {
    if (error.code === 'P2025') return next(new AppError('Fee not found.', 404))
    next(error)
  }
}

export const recordPayment = async (req, res, next) => {
  try {
    const { feeId } = req.params
    const { studentId, amountPaid, paymentMethod, status } = req.body

    const fee = await prisma.fee.findUnique({ where: { id: feeId } })
    if (!fee) throw new AppError('Fee not found.', 404)

    const student = await prisma.studentProfile.findUnique({ where: { id: studentId } })
    if (!student) throw new AppError('Student not found.', 404)

    const payment = await prisma.feePayment.upsert({
      where: { feeId_studentId: { feeId, studentId } },
      update: { amountPaid, paymentMethod, status, paymentDate: new Date() },
      create: { feeId, studentId, amountPaid, paymentMethod, status: status || 'PAID' },
      include: { fee: true, student: { include: { user: { select: { firstName: true, lastName: true } } } } },
    })

    res.status(201).json({ success: true, data: payment })
  } catch (error) {
    next(error)
  }
}

export const getPaymentsByStudent = async (req, res, next) => {
  try {
    const { studentId } = req.params
    const { page, limit } = req.query
    const { skip, take } = paginate(page, limit)

    const [payments, total] = await Promise.all([
      prisma.feePayment.findMany({
        where: { studentId },
        skip,
        take,
        include: { fee: { include: { class: true } } },
        orderBy: { paymentDate: 'desc' },
      }),
      prisma.feePayment.count({ where: { studentId } }),
    ])

    res.json({
      success: true,
      data: payments,
      pagination: { page: parseInt(page) || 1, limit: take, total, totalPages: Math.ceil(total / take) },
    })
  } catch (error) {
    next(error)
  }
}
