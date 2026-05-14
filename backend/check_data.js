import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

for (const model of ['user', 'studentProfile', 'teacherProfile', 'class', 'subject', 'attendance', 'exam', 'examResult', 'fee', 'feePayment']) {
  const count = await prisma[model].count()
  console.log(`${model}: ${count}`)
}

await prisma.$disconnect()
