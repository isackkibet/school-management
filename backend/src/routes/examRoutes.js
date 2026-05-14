import { Router } from 'express'
import {
  createExam, getAllExams, getExamById, updateExam, deleteExam, recordResults,
} from '../controllers/examController.js'
import { authenticate } from '../middleware/auth.js'
import { authorize } from '../middleware/roleCheck.js'
import { validate } from '../middleware/validate.js'
import { createExamSchema, updateExamSchema, createResultSchema } from '../validators/examValidator.js'

const router = Router()

router.use(authenticate)

router.route('/')
  .post(authorize('SUPER_ADMIN', 'ADMIN'), validate(createExamSchema), createExam)
  .get(authorize('SUPER_ADMIN', 'ADMIN', 'TEACHER'), getAllExams)

router.route('/:id')
  .get(authorize('SUPER_ADMIN', 'ADMIN', 'TEACHER'), getExamById)
  .patch(authorize('SUPER_ADMIN', 'ADMIN'), validate(updateExamSchema), updateExam)
  .delete(authorize('SUPER_ADMIN', 'ADMIN'), deleteExam)

router.post('/:examId/results', authorize('SUPER_ADMIN', 'ADMIN', 'TEACHER'), validate(createResultSchema), recordResults)

export default router
