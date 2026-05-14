import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const fixes = [
  {
    table: 'User',
    create: `CREATE TABLE IF NOT EXISTS "User_new" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "email" TEXT NOT NULL,
      "password" TEXT NOT NULL,
      "role" TEXT NOT NULL DEFAULT 'STUDENT',
      "firstName" TEXT NOT NULL,
      "lastName" TEXT NOT NULL,
      "phone" TEXT,
      "address" TEXT,
      "dateOfBirth" DATETIME,
      "gender" TEXT,
      "isActive" BOOLEAN NOT NULL DEFAULT true,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL
    )`,
    insert: (cols) => `INSERT INTO "User_new" (${cols}) SELECT ${cols} FROM "User"`,
    allCols: ['id', 'email', 'password', 'role', 'firstName', 'lastName', 'phone', 'address', 'dateOfBirth', 'gender', 'isActive', 'createdAt', 'updatedAt'],
    indexes: [
      `CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User_new"("email")`,
    ],
  },
  {
    table: 'StudentProfile',
    create: `CREATE TABLE IF NOT EXISTS "StudentProfile_new" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "userId" TEXT NOT NULL,
      "studentId" TEXT NOT NULL,
      "classId" TEXT,
      "guardianName" TEXT,
      "guardianPhone" TEXT,
      "enrollmentDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
    allCols: ['id', 'userId', 'studentId', 'classId', 'guardianName', 'guardianPhone', 'enrollmentDate'],
    indexes: [
      `CREATE UNIQUE INDEX IF NOT EXISTS "StudentProfile_userId_key" ON "StudentProfile_new"("userId")`,
      `CREATE UNIQUE INDEX IF NOT EXISTS "StudentProfile_studentId_key" ON "StudentProfile_new"("studentId")`,
    ],
  },
  {
    table: 'TeacherProfile',
    create: `CREATE TABLE IF NOT EXISTS "TeacherProfile_new" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "userId" TEXT NOT NULL,
      "teacherId" TEXT NOT NULL,
      "qualification" TEXT,
      "specialization" TEXT,
      "joinDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
    allCols: ['id', 'userId', 'teacherId', 'qualification', 'specialization', 'joinDate'],
    indexes: [
      `CREATE UNIQUE INDEX IF NOT EXISTS "TeacherProfile_userId_key" ON "TeacherProfile_new"("userId")`,
      `CREATE UNIQUE INDEX IF NOT EXISTS "TeacherProfile_teacherId_key" ON "TeacherProfile_new"("teacherId")`,
    ],
  },
  {
    table: 'Class',
    create: `CREATE TABLE IF NOT EXISTS "Class_new" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "section" TEXT,
      "room" TEXT,
      "classTeacherId" TEXT,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL
    )`,
    allCols: ['id', 'name', 'section', 'room', 'classTeacherId', 'createdAt', 'updatedAt'],
    indexes: [],
  },
  {
    table: 'Subject',
    create: `CREATE TABLE IF NOT EXISTS "Subject_new" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "code" TEXT NOT NULL,
      "classId" TEXT NOT NULL,
      "teacherId" TEXT
    )`,
    allCols: ['id', 'name', 'code', 'classId', 'teacherId'],
    indexes: [],
  },
  {
    table: 'Attendance',
    create: `CREATE TABLE IF NOT EXISTS "Attendance_new" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "studentId" TEXT NOT NULL,
      "classId" TEXT NOT NULL,
      "date" DATETIME NOT NULL,
      "status" TEXT NOT NULL DEFAULT 'PRESENT',
      "remark" TEXT,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL
    )`,
    allCols: ['id', 'studentId', 'classId', 'date', 'status', 'remark', 'createdAt', 'updatedAt'],
    indexes: [
      `CREATE UNIQUE INDEX IF NOT EXISTS "Attendance_studentId_classId_date_key" ON "Attendance_new"("studentId", "classId", "date")`,
    ],
  },
  {
    table: 'Exam',
    create: `CREATE TABLE IF NOT EXISTS "Exam_new" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "classId" TEXT NOT NULL,
      "subjectId" TEXT NOT NULL,
      "date" DATETIME NOT NULL,
      "totalMarks" INTEGER NOT NULL,
      "passMarks" INTEGER NOT NULL DEFAULT 40,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL
    )`,
    allCols: ['id', 'name', 'classId', 'subjectId', 'date', 'totalMarks', 'passMarks', 'createdAt', 'updatedAt'],
    indexes: [],
  },
  {
    table: 'ExamResult',
    create: `CREATE TABLE IF NOT EXISTS "ExamResult_new" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "examId" TEXT NOT NULL,
      "studentId" TEXT NOT NULL,
      "marksObtained" INTEGER NOT NULL,
      "grade" TEXT,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL
    )`,
    allCols: ['id', 'examId', 'studentId', 'marksObtained', 'grade', 'createdAt', 'updatedAt'],
    indexes: [
      `CREATE UNIQUE INDEX IF NOT EXISTS "ExamResult_examId_studentId_key" ON "ExamResult_new"("examId", "studentId")`,
    ],
  },
  {
    table: 'Fee',
    create: `CREATE TABLE IF NOT EXISTS "Fee_new" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "amount" REAL NOT NULL,
      "classId" TEXT NOT NULL,
      "dueDate" DATETIME NOT NULL,
      "academicYear" TEXT NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL
    )`,
    allCols: ['id', 'name', 'amount', 'classId', 'dueDate', 'academicYear', 'createdAt', 'updatedAt'],
    indexes: [],
  },
  {
    table: 'FeePayment',
    create: `CREATE TABLE IF NOT EXISTS "FeePayment_new" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "feeId" TEXT NOT NULL,
      "studentId" TEXT NOT NULL,
      "amountPaid" REAL NOT NULL,
      "paymentDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "paymentMethod" TEXT,
      "status" TEXT NOT NULL DEFAULT 'UNPAID',
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL
    )`,
    allCols: ['id', 'feeId', 'studentId', 'amountPaid', 'paymentDate', 'paymentMethod', 'status', 'createdAt', 'updatedAt'],
    indexes: [
      `CREATE UNIQUE INDEX IF NOT EXISTS "FeePayment_feeId_studentId_key" ON "FeePayment_new"("feeId", "studentId")`,
    ],
  },
]

await prisma.$transaction(async (tx) => {
  // Disable FK checks during migration
  await tx.$executeRawUnsafe(`PRAGMA foreign_keys = OFF`)
  await tx.$executeRawUnsafe(`PRAGMA defer_foreign_keys = ON`)

  for (const fix of fixes) {
    const exists = await tx.$queryRawUnsafe(
      `SELECT name FROM sqlite_master WHERE type='table' AND name=?`, fix.table
    )
    if (exists.length === 0) {
      console.log(`Table ${fix.table} does not exist, skipping`)
      continue
    }

    console.log(`Migrating ${fix.table}...`)

    try {
      // Create new table
      await tx.$executeRawUnsafe(fix.create)

      // Copy data
      const cols = fix.allCols.join(', ')
      await tx.$executeRawUnsafe(fix.insert(cols))

      // Create indexes
      for (const idx of fix.indexes) {
        await tx.$executeRawUnsafe(idx)
      }

      // Drop old table and rename
      await tx.$executeRawUnsafe(`DROP TABLE "${fix.table}"`)
      await tx.$executeRawUnsafe(`ALTER TABLE "${fix.table}_new" RENAME TO "${fix.table}"`)

      console.log(`  OK`)
    } catch (err) {
      console.error(`  FAILED: ${err.message}`)
      await tx.$executeRawUnsafe(`DROP TABLE IF EXISTS "${fix.table}_new"`)
    }
  }

  await tx.$executeRawUnsafe(`PRAGMA foreign_keys = ON`)
})

console.log('\nDone. Regenerate Prisma client with: npx prisma generate')
await prisma.$disconnect()
