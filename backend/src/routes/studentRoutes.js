import { Router } from 'express'
import {
  createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent,
} from '../controllers/studentController.js'
import { authenticate } from '../middleware/auth.js'
import { authorize } from '../middleware/roleCheck.js'
import { validate } from '../middleware/validate.js'
import { createStudentSchema, updateStudentSchema } from '../validators/studentValidator.js'

const router = Router()

router.use(authenticate)

router.route('/')
  .post(authorize('SUPER_ADMIN', 'ADMIN'), validate(createStudentSchema), createStudent)
  .get(authorize('SUPER_ADMIN', 'ADMIN', 'TEACHER'), getAllStudents)

router.route('/:id')
  .get(authorize('SUPER_ADMIN', 'ADMIN', 'TEACHER'), getStudentById)
  .patch(authorize('SUPER_ADMIN', 'ADMIN'), validate(updateStudentSchema), updateStudent)
  .delete(authorize('SUPER_ADMIN', 'ADMIN'), deleteStudent)

export default router
