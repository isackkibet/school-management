import Joi from 'joi'

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  role: Joi.string().valid('SUPER_ADMIN', 'ADMIN', 'ACCOUNTANT', 'TEACHER', 'STUDENT', 'PARENT').required(),
  phone: Joi.string().allow('', null),
  address: Joi.string().allow('', null),
  dateOfBirth: Joi.date().allow(null),
  gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER').allow(null),
})
