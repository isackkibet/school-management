import { Router } from 'express'
import {
  createFee, getAllFees, getFeeById, updateFee, deleteFee, recordPayment, getPaymentsByStudent,
} from '../controllers/feeController.js'
import { authenticate } from '../middleware/auth.js'
import { authorize } from '../middleware/roleCheck.js'
import { validate } from '../middleware/validate.js'
import { createFeeSchema, updateFeeSchema, recordPaymentSchema } from '../validators/feeValidator.js'

const router = Router()

router.use(authenticate)

router.route('/')
  .post(authorize('SUPER_ADMIN', 'ADMIN', 'ACCOUNTANT'), validate(createFeeSchema), createFee)
  .get(authorize('SUPER_ADMIN', 'ADMIN', 'ACCOUNTANT', 'TEACHER'), getAllFees)

router.route('/:id')
  .get(authorize('SUPER_ADMIN', 'ADMIN', 'ACCOUNTANT', 'TEACHER', 'STUDENT', 'PARENT'), getFeeById)
  .patch(authorize('SUPER_ADMIN', 'ADMIN', 'ACCOUNTANT'), validate(updateFeeSchema), updateFee)
  .delete(authorize('SUPER_ADMIN', 'ADMIN', 'ACCOUNTANT'), deleteFee)

router.post('/:feeId/payments', authorize('SUPER_ADMIN', 'ADMIN', 'ACCOUNTANT'), validate(recordPaymentSchema), recordPayment)
router.get('/payments/student/:studentId', authorize('SUPER_ADMIN', 'ADMIN', 'ACCOUNTANT', 'TEACHER', 'STUDENT', 'PARENT'), getPaymentsByStudent)

export default router
