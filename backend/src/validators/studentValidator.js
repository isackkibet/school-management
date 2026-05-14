import Joi from 'joi'

export const createStudentSchema = Joi.object({
  userId: Joi.string().required(),
  classId: Joi.string().required(),
  guardianName: Joi.string().allow('', null),
  guardianPhone: Joi.string().allow('', null),
})

export const updateStudentSchema = Joi.object({
  classId: Joi.string(),
  guardianName: Joi.string().allow('', null),
  guardianPhone: Joi.string().allow('', null),
})
