import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const result = await prisma.$queryRawUnsafe('PRAGMA table_info(StudentProfile)')
for (const row of result) {
  console.log(`${row.name}: nullable=${row.notnull === 0}, type=${row.type}`)
}
await prisma.$disconnect()
