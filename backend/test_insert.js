import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Directly test: can we create a studentProfile with null classId?
try {
  const user = await prisma.user.findFirst()
  if (user) {
    console.log('Found user:', user.id, user.email)
    
    // Use Prisma to create a student profile (to test the schema)
    const sp = await prisma.studentProfile.create({
      data: {
        userId: user.id,
        studentId: 'TEST-001',
        // classId omitted intentionally
      }
    })
    console.log('Created studentProfile:', sp.id)
    
    // Clean up
    await prisma.studentProfile.delete({ where: { id: sp.id } })
    console.log('Cleanup done')
  } else {
    console.log('No users found')
  }
} catch (err) {
  console.error('Error:', err.message)
}

await prisma.$disconnect()
