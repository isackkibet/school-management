import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const tables = await prisma.$queryRawUnsafe("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE '_prisma_%' AND name NOT LIKE 'sqlite_%' ORDER BY name")
for (const { name } of tables) {
  console.log(`\n=== ${name} ===`)
  const cols = await prisma.$queryRawUnsafe(`PRAGMA table_info("${name}")`)
  for (const col of cols) {
    const nullable = col.notnull === 0
    console.log(`  ${col.name}: nullable=${nullable}`)
  }
}

// Also verify we can register a student
console.log('\n\n=== Test student registration ===')
try {
  const user = await prisma.user.findFirst()
  const sp = await prisma.studentProfile.create({
    data: {
      userId: user.id,
      studentId: 'TEST-FINAL',
    }
  })
  console.log('OK - created student without classId:', sp.id)
  await prisma.studentProfile.delete({ where: { id: sp.id } })
} catch (err) {
  console.error('FAILED:', err.message)
}

await prisma.$disconnect()
