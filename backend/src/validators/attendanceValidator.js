import Joi from 'joi'

export const markAttendanceSchema = Joi.object({
  records: Joi.array().items(
    Joi.object({
      studentId: Joi.string().required(),
      status: Joi.string().valid('PRESENT', 'ABSENT', 'LATE', 'EXCUSED').required(),
      remark: Joi.string().allow('', null),
    })
  ).min(1).required(),
  classId: Joi.string().required(),
  date: Joi.date().required(),
})

export const updateAttendanceSchema = Joi.object({
  status: Joi.string().valid('PRESENT', 'ABSENT', 'LATE', 'EXCUSED').required(),
  remark: Joi.string().allow('', null),
})
