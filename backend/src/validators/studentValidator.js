import Joi from 'joi'

export const createStudentSchema = Joi.object({
  userId: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  firstName: Joi.string().min(2).max(50),
  lastName: Joi.string().min(2).max(50),
  phone: Joi.string().allow('', null),
  address: Joi.string().allow('', null),
  dateOfBirth: Joi.date().allow(null),
  gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER').allow(null),
  studentId: Joi.string().allow('', null),
  classId: Joi.string().required(),
  guardianName: Joi.string().allow('', null),
  guardianPhone: Joi.string().allow('', null),
}).xor('userId', 'email').with('email', 'firstName').with('email', 'lastName')

export const updateStudentSchema = Joi.object({
  classId: Joi.string(),
  firstName: Joi.string().min(2).max(50),
  lastName: Joi.string().min(2).max(50),
  phone: Joi.string().allow('', null),
  address: Joi.string().allow('', null),
  dateOfBirth: Joi.date().allow(null),
  gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER').allow(null),
  guardianName: Joi.string().allow('', null),
  guardianPhone: Joi.string().allow('', null),
})
