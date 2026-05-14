import { AppError } from './errorHandler.js'

export const validate = (schema) => {
  return (req, _res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true })
    if (error) {
      const msgs = error.details.map(d => d.message).join('; ')
      return next(new AppError(msgs, 400))
    }
    req.body = value
    next()
  }
}
