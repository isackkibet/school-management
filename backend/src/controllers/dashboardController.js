import prisma from '../config/database.js'

export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalStudents,
      totalTeachers,
      totalClasses,
      totalSubjects,
      totalExams,
      totalFees,
      totalPayments,
      recentPayments,
      recentUsers,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.studentProfile.count(),
      prisma.teacherProfile.count(),
      prisma.class.count(),
      prisma.subject.count(),
      prisma.exam.count(),
      prisma.fee.aggregate({ _sum: { amount: true } }),
      prisma.feePayment.aggregate({ _sum: { amountPaid: true } }),
      prisma.feePayment.findMany({
        take: 5,
        orderBy: { paymentDate: 'desc' },
        include: {
          fee: true,
          student: { include: { user: { select: { firstName: true, lastName: true } } } },
        },
      }),
      prisma.user.findMany({
        take: 6,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          isActive: true,
          createdAt: true,
        },
      }),
    ])

    res.json({
      success: true,
      data: {
        user: req.user,
        stats: {
          totalUsers,
          totalStudents,
          totalTeachers,
          totalClasses,
          totalSubjects,
          totalExams,
          totalFeeAmount: totalFees._sum.amount || 0,
          totalPaidAmount: totalPayments._sum.amountPaid || 0,
          outstandingAmount: Math.max((totalFees._sum.amount || 0) - (totalPayments._sum.amountPaid || 0), 0),
        },
        recentPayments,
        recentUsers,
        notices: [
          {
            type: 'success',
            title: 'Server connected',
            message: 'Dashboard data loaded from the school API.',
            createdAt: new Date().toISOString(),
          },
          {
            type: 'info',
            title: 'Authenticated session',
            message: `${req.user.firstName} ${req.user.lastName} is signed in as ${req.user.role}.`,
            createdAt: new Date().toISOString(),
          },
        ],
      },
    })
  } catch (error) {
    next(error)
  }
}
