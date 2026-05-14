import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Check actual data counts
const userCount = await prisma.user.count()
const studentCount = await prisma.studentProfile.count()
const teacherCount = await prisma.teacherProfile.count()
const classCount = await prisma.class.count()
const subjectCount = await prisma.subject.count()

console.log(`Users: ${userCount}, Students: ${studentCount}, Teachers: ${teacherCount}, Classes: ${classCount}, Subjects: ${subjectCount}`)

// Explicitly check User table nullability via sqlite_master
const schemaSQL = await prisma.$queryRawUnsafe("SELECT sql FROM sqlite_master WHERE type='table' AND name='User'")
console.log("User table SQL:")
for (const row of schemaSQL) {
  console.log(row.sql)
}

// Check for _new tables
const newTables = await prisma.$queryRawUnsafe("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%\\_new' ESCAPE '\\'")
console.log("\n_new tables found:", newTables.length)
for (const { name } of newTables) {
  console.log(`  ${name}`)
}

await prisma.$disconnect()
