import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Since SQLite doesn't support ALTER COLUMN, we need to recreate the table
await prisma.$executeRawUnsafe(`
  CREATE TABLE IF NOT EXISTS "StudentProfile_new" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "userId" TEXT NOT NULL,
      "studentId" TEXT NOT NULL,
      "classId" TEXT,
      "guardianName" TEXT,
      "guardianPhone" TEXT,
      "enrollmentDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "StudentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE,
      CONSTRAINT "StudentProfile_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE SET NULL
  )
`)

await prisma.$executeRawUnsafe(`
  INSERT INTO "StudentProfile_new" ("id", "userId", "studentId", "classId", "guardianName", "guardianPhone", "enrollmentDate")
  SELECT "id", "userId", "studentId", "classId", "guardianName", "guardianPhone", "enrollmentDate" FROM "StudentProfile"
`)

await prisma.$executeRawUnsafe(`DROP TABLE "StudentProfile"`)
await prisma.$executeRawUnsafe(`ALTER TABLE "StudentProfile_new" RENAME TO "StudentProfile"`)

// Recreate indexes
await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX "StudentProfile_studentId_key" ON "StudentProfile"("studentId")`)
await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX "StudentProfile_userId_key" ON "StudentProfile"("userId")`)

console.log('Schema fixed successfully')
await prisma.$disconnect()
