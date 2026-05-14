import jwt from 'jsonwebtoken'
import prisma from '../config/database.js'
import { AppError } from './errorHandler.js'

export const authenticate = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      throw new AppError('No token provided.', 401)
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, role: true, firstName: true, lastName: true, isActive: true },
    })

    if (!user || !user.isActive) {
      throw new AppError('Token invalid or account deactivated.', 401)
    }

    req.user = user
    next()
  } catch (error) {
    if (error instanceof AppError) return next(error)
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(new AppError('Token expired or invalid.', 401))
    }
    // TODO: log this properly
    next(error)
  }
}
