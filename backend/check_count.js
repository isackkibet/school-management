import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const count = await prisma.studentProfile.count()
console.log('StudentProfile count:', count)
await prisma.$disconnect()
