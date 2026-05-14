import prisma from '../config/database.js'

export const getDashboardStats = async (_req, res, next) => {
  try {
    const [totalStudents, totalTeachers, totalClasses, totalSubjects, totalExams, recentPayments] = await Promise.all([
      prisma.studentProfile.count(),
      prisma.teacherProfile.count(),
      prisma.class.count(),
      prisma.subject.count(),
      prisma.exam.count(),
      prisma.feePayment.findMany({
        take: 10,
        orderBy: { paymentDate: 'desc' },
        include: {
          fee: true,
          student: { include: { user: { select: { firstName: true, lastName: true } } } },
        },
      }),
    ])

    res.json({
      success: true,
      data: {
        stats: { totalStudents, totalTeachers, totalClasses, totalSubjects, totalExams },
        recentPayments,
      },
    })
  } catch (error) {
    next(error)
  }
}
