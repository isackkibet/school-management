import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 12)

  // admin
  await prisma.user.upsert({
    where: { email: 'admin@school.com' },
    update: {},
    create: {
      email: 'admin@school.com',
      password: adminPassword,
      role: 'SUPER_ADMIN',
      firstName: 'System',
      lastName: 'Admin',
      phone: '1234567890',
      gender: 'MALE',
    },
  })

  // classes
  const class10 = await prisma.class.create({
    data: { name: 'Class 10', section: 'A', room: '101' },
  })

  const class9 = await prisma.class.create({
    data: { name: 'Class 9', section: 'A', room: '102' },
  })

  // teacher
  const teacherPassword = await bcrypt.hash('teacher123', 12)
  const teacherUser = await prisma.user.upsert({
    where: { email: 'teacher@school.com' },
    update: {},
    create: {
      email: 'teacher@school.com',
      password: teacherPassword,
      role: 'TEACHER',
      firstName: 'John',
      lastName: 'Doe',
      phone: '9876543210',
      gender: 'MALE',
    },
  })

  const teacher = await prisma.teacherProfile.create({
    data: {
      userId: teacherUser.id,
      teacherId: 'TCH25001',
      qualification: 'M.Sc. Mathematics',
      specialization: 'Mathematics',
    },
  })

  await prisma.class.update({
    where: { id: class10.id },
    data: { classTeacherId: teacher.id },
  })

  // subjects
  const math = await prisma.subject.create({
    data: { name: 'Mathematics', code: 'MTH10', classId: class10.id, teacherId: teacher.id },
  })
  await prisma.subject.create({
    data: { name: 'Science', code: 'SCI10', classId: class10.id },
  })
  await prisma.subject.create({
    data: { name: 'English', code: 'ENG10', classId: class10.id },
  })
  await prisma.subject.create({
    data: { name: 'Mathematics', code: 'MTH09', classId: class9.id },
  })

  // student
  const studentPassword = await bcrypt.hash('student123', 12)
  const studentUser = await prisma.user.upsert({
    where: { email: 'student@school.com' },
    update: {},
    create: {
      email: 'student@school.com',
      password: studentPassword,
      role: 'STUDENT',
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '5551234567',
      gender: 'FEMALE',
    },
  })

  await prisma.studentProfile.create({
    data: {
      userId: studentUser.id,
      studentId: 'STU25001',
      classId: class10.id,
      guardianName: 'Bob Smith',
      guardianPhone: '5559876543',
    },
  })

  // exam
  await prisma.exam.create({
    data: {
      name: 'Mid Term Exam',
      classId: class10.id,
      subjectId: math.id,
      date: new Date('2026-06-15'),
      totalMarks: 100,
      passMarks: 40,
    },
  })

  // fee
  await prisma.fee.create({
    data: {
      name: 'Tuition Fee - Term 1',
      amount: 5000,
      classId: class10.id,
      dueDate: new Date('2026-05-01'),
      academicYear: '2026-2027',
    },
  })

  console.log('Seed done.')
  console.log('Admin: admin@school.com / admin123')
  console.log('Teacher: teacher@school.com / teacher123')
  console.log('Student: student@school.com / student123')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
