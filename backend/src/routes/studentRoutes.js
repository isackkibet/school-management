import { Router } from 'express'
import {
  createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent,
  bulkCreateStudents, assignStudentClass, toggleStudentStatus, getUnassignedStudents,
} from '../controllers/studentController.js'
import { authenticate } from '../middleware/auth.js'
import { authorize } from '../middleware/roleCheck.js'
import { validate } from '../middleware/validate.js'
import {
  createStudentSchema, updateStudentSchema, bulkCreateStudentsSchema,
  assignClassSchema, toggleStatusSchema,
} from '../validators/studentValidator.js'

const router = Router()

router.use(authenticate)

router.route('/')
  .post(authorize('SUPER_ADMIN', 'ADMIN'), validate(createStudentSchema), createStudent)
  .get(authorize('SUPER_ADMIN', 'ADMIN', 'TEACHER'), getAllStudents)

router.post('/bulk', authorize('SUPER_ADMIN', 'ADMIN'), validate(bulkCreateStudentsSchema), bulkCreateStudents)

router.get('/unassigned', authorize('SUPER_ADMIN', 'ADMIN'), getUnassignedStudents)

router.route('/:id')
  .get(authorize('SUPER_ADMIN', 'ADMIN', 'TEACHER'), getStudentById)
  .patch(authorize('SUPER_ADMIN', 'ADMIN'), validate(updateStudentSchema), updateStudent)
  .delete(authorize('SUPER_ADMIN', 'ADMIN'), deleteStudent)

router.patch('/:id/assign-class', authorize('SUPER_ADMIN', 'ADMIN'), validate(assignClassSchema), assignStudentClass)
router.patch('/:id/status', authorize('SUPER_ADMIN', 'ADMIN'), validate(toggleStatusSchema), toggleStudentStatus)

export default router
