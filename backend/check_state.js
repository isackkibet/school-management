import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Check the current state of the database
const tables = await prisma.$queryRawUnsafe("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE '_prisma_%' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '%_new' ORDER BY name")

// Check for _new tables that might have been left behind
const newTables = await prisma.$queryRawUnsafe("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%_new'")
if (newTables.length > 0) {
  console.log("WARNING: Orphaned _new tables found:")
  for (const { name } of newTables) {
    console.log(`  - ${name}`)
  }
}

for (const { name } of tables) {
  console.log(`\n=== ${name} ===`)
  const cols = await prisma.$queryRawUnsafe(`PRAGMA table_info("${name}")`)
  for (const col of cols) {
    console.log(`  ${col.name}: nullable=${col.notnull === 0}, pk=${col.pk}`)
  }
}

await prisma.$disconnect()
