import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Check raw data
const studentCount = await prisma.$queryRawUnsafe("SELECT COUNT(*) as cnt FROM StudentProfile")
console.log('Raw StudentProfile count:', studentCount[0].cnt.toString())

const teacherCount = await prisma.$queryRawUnsafe("SELECT COUNT(*) as cnt FROM TeacherProfile")
console.log('Raw TeacherProfile count:', teacherCount[0].cnt.toString())

const userCols = await prisma.$queryRawUnsafe("SELECT sql FROM sqlite_master WHERE type='table' AND name='StudentProfile'")
for (const row of userCols) {
  console.log('StudentProfile DDL:', row.sql)
}

await prisma.$disconnect()
