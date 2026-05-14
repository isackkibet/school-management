import Joi from 'joi'

export const createFeeSchema = Joi.object({
  name: Joi.string().required(),
  amount: Joi.number().positive().required(),
  classId: Joi.string().required(),
  dueDate: Joi.date().required(),
  academicYear: Joi.string().required(),
})

export const updateFeeSchema = Joi.object({
  name: Joi.string(),
  amount: Joi.number().positive(),
  dueDate: Joi.date(),
  academicYear: Joi.string(),
})

export const recordPaymentSchema = Joi.object({
  studentId: Joi.string().required(),
  amountPaid: Joi.number().positive().required(),
  paymentMethod: Joi.string().allow('', null),
  status: Joi.string().valid('PAID', 'UNPAID', 'PARTIAL', 'OVERDUE').default('PAID'),
});
