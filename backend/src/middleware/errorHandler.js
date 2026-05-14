export class AppError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}

export const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500
  const msg = err.isOperational ? err.message : 'Something went wrong'

  if (!err.isOperational) {
    console.error('UNEXPECTED:', err)
  }

  res.status(statusCode).json({
    success: false,
    error: msg,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}
