import Joi from 'joi'

export const createTeacherSchema = Joi.object({
  userId: Joi.string().required(),
  qualification: Joi.string().allow('', null),
  specialization: Joi.string().allow('', null),
})

export const updateTeacherSchema = Joi.object({
  qualification: Joi.string().allow('', null),
  specialization: Joi.string().allow('', null),
})
