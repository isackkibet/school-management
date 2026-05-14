import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../config/database.js'
import { AppError } from '../middleware/errorHandler.js'
import { generateStudentId, generateTeacherId } from '../utils/helpers.js'

const generateToken = (user) => jwt.sign(
  { id: user.id, email: user.email, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
)

export const register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, role, phone, address, dateOfBirth, gender } = req.body

    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) throw new AppError('Email already taken.', 409)

    const hashed = await bcrypt.hash(password, 12)

    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email,
          password: hashed,
          firstName,
          lastName,
          role,
          phone,
          address,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
          gender,
        },
        select: { id: true, email: true, role: true, firstName: true, lastName: true, createdAt: true },
      })

      if (role === 'STUDENT') {
        const count = await tx.studentProfile.count()
        const admissionNumber = generateStudentId('GEN', count + 1)
        await tx.studentProfile.create({
          data: {
            userId: newUser.id,
            studentId: admissionNumber,
          },
        })
      }

      if (role === 'TEACHER') {
        const count = await tx.teacherProfile.count()
        await tx.teacherProfile.create({
          data: {
            userId: newUser.id,
            teacherId: generateTeacherId(count + 1),
          },
        })
      }

      return newUser
    })

    const token = generateToken(user)

    res.status(201).json({ success: true, data: { user, token } })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) throw new AppError('Wrong email or password.', 401)
    if (!user.isActive) throw new AppError('Account deactivated.', 401)

    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new AppError('Wrong email or password.', 401)

    const token = generateToken(user)

    const { password: _, ...userData } = user
    res.json({ success: true, data: { user: userData, token } })
  } catch (error) {
    next(error)
  }
}

export const getMe = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true, email: true, role: true, firstName: true, lastName: true,
        phone: true, address: true, dateOfBirth: true, gender: true, isActive: true,
        createdAt: true, updatedAt: true,
        studentProfile: { include: { class: true } },
        teacherProfile: { include: { classes: true, subjects: true } },
      },
    })
    if (!user) throw new AppError('User not found.', 404)

    res.json({ success: true, data: user })
  } catch (error) {
    next(error)
  }
}

export const updateProfile = async (req, res, next) => {
  try {
    const allowed = ['firstName', 'lastName', 'phone', 'address', 'gender']
    const updates = {}
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key]
    }

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: updates,
      select: { id: true, email: true, role: true, firstName: true, lastName: true, phone: true, address: true, gender: true },
    })

    res.json({ success: true, data: user })
  } catch (error) {
    next(error)
  }
}
