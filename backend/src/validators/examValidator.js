import Joi from 'joi'

export const createExamSchema = Joi.object({
  name: Joi.string().required(),
  classId: Joi.string().required(),
  subjectId: Joi.string().required(),
  date: Joi.date().required(),
  totalMarks: Joi.number().integer().min(1).required(),
  passMarks: Joi.number().integer().min(0).default(40),
})

export const updateExamSchema = Joi.object({
  name: Joi.string(),
  date: Joi.date(),
  totalMarks: Joi.number().integer().min(1),
  passMarks: Joi.number().integer().min(0),
})

export const createResultSchema = Joi.object({
  results: Joi.array().items(
    Joi.object({
      studentId: Joi.string().required(),
      marksObtained: Joi.number().min(0).required(),
    })
  ).min(1).required(),
})
