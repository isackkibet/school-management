import { AppError } from './errorHandler.js'

export const authorize = (...roles) => {
  return (req, _res, next) => {
    if (!req.user) {
      return next(new AppError('Auth required.', 401))
    }
    if (!roles.includes(req.user.role)) {
      return next(new AppError(`Role ${req.user.role} not allowed here.`, 403))
    }
    next()
  }
}
