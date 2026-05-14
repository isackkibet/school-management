import prisma from '../config/database.js'
import { AppError } from '../middleware/errorHandler.js'
import { paginate } from '../utils/helpers.js'

export const markAttendance = async (req, res, next) => {
  try {
    const { records, classId, date } = req.body
    const attendanceDate = new Date(date)
    attendanceDate.setHours(0, 0, 0, 0)

    const cls = await prisma.class.findUnique({ where: { id: classId } })
    if (!cls) throw new AppError('Class not found.', 404)

    const created = []
    for (const record of records) {
      const student = await prisma.studentProfile.findUnique({ where: { id: record.studentId } })
      if (!student) throw new AppError(`Student ${record.studentId} not found.`, 404)
      if (student.classId !== classId) throw new AppError(`Student ${record.studentId} not in this class.`, 400)

      const attendance = await prisma.attendance.upsert({
        where: { studentId_classId_date: { studentId: record.studentId, classId, date: attendanceDate } },
        update: { status: record.status, remark: record.remark || null },
        create: {
          studentId: record.studentId,
          classId,
          date: attendanceDate,
          status: record.status,
          remark: record.remark || null,
        },
        include: { student: { include: { user: { select: { firstName: true, lastName: true } } } } },
      })
      created.push(attendance)
    }

    res.status(201).json({ success: true, data: created, message: `Marked ${created.length} students.` })
  } catch (error) {
    next(error)
  }
}

export const getAttendanceByClass = async (req, res, next) => {
  try {
    const { classId } = req.params
    const { date, page, limit } = req.query
    const { skip, take } = paginate(page, limit)

    const where = { classId }
    if (date) {
      const d = new Date(date)
      d.setHours(0, 0, 0, 0)
      const nextDay = new Date(d)
      nextDay.setDate(nextDay.getDate() + 1)
      where.date = { gte: d, lt: nextDay }
    }

    const [records, total] = await Promise.all([
      prisma.attendance.findMany({
        where,
        skip,
        take,
        include: { student: { include: { user: { select: { firstName: true, lastName: true } } } } },
        orderBy: { date: 'desc' },
      }),
      prisma.attendance.count({ where }),
    ])

    res.json({
      success: true,
      data: records,
      pagination: { page: parseInt(page) || 1, limit: take, total, totalPages: Math.ceil(total / take) },
    })
  } catch (error) {
    next(error)
  }
}

export const getAttendanceByStudent = async (req, res, next) => {
  try {
    const { studentId } = req.params
    const { page, limit } = req.query
    const { skip, take } = paginate(page, limit)

    const [records, total] = await Promise.all([
      prisma.attendance.findMany({
        where: { studentId },
        skip,
        take,
        include: { class: { select: { id: true, name: true, section: true } } },
        orderBy: { date: 'desc' },
      }),
      prisma.attendance.count({ where: { studentId } }),
    ])

    res.json({
      success: true,
      data: records,
      pagination: { page: parseInt(page) || 1, limit: take, total, totalPages: Math.ceil(total / take) },
    })
  } catch (error) {
    next(error)
  }
}

export const updateAttendance = async (req, res, next) => {
  try {
    const attendance = await prisma.attendance.update({
      where: { id: req.params.id },
      data: req.body,
      include: { student: { include: { user: { select: { firstName: true, lastName: true } } } } },
    })

    res.json({ success: true, data: attendance })
  } catch (error) {
    if (error.code === 'P2025') return next(new AppError('Attendance record not found.', 404))
    next(error)
  }
}

export const getAttendanceSummary = async (req, res, next) => {
  try {
    const { classId, startDate, endDate } = req.query

    const where = {}
    if (classId) where.classId = classId
    if (startDate && endDate) {
      where.date = { gte: new Date(startDate), lte: new Date(endDate) }
    }

    const summary = await prisma.attendance.groupBy({
      by: ['studentId', 'status'],
      where,
      _count: { status: true },
    })

    const grouped = {}
    for (const entry of summary) {
      const key = entry.studentId
      if (!grouped[key]) grouped[key] = { PRESENT: 0, ABSENT: 0, LATE: 0, EXCUSED: 0 }
      grouped[key][entry.status] = entry._count.status
    }

    res.json({ success: true, data: grouped })
  } catch (error) {
    next(error)
  }
}
