import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const tables = await prisma.$queryRawUnsafe("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE '_prisma_%' AND name NOT LIKE 'sqlite_%'")
for (const { name } of tables) {
  console.log(`\n=== ${name} ===`)
  const cols = await prisma.$queryRawUnsafe(`PRAGMA table_info("${name}")`)
  for (const col of cols) {
    console.log(`  ${col.name}: nullable=${col.notnull === 0}, type=${col.type}`)
  }
}

await prisma.$disconnect()
