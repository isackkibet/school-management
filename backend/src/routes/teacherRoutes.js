import { Router } from 'express'
import {
  createTeacher, getAllTeachers, getTeacherById, updateTeacher, deleteTeacher, assignClass, assignSubject,
} from '../controllers/teacherController.js'
import { authenticate } from '../middleware/auth.js'
import { authorize } from '../middleware/roleCheck.js'
import { validate } from '../middleware/validate.js'
import { createTeacherSchema, updateTeacherSchema } from '../validators/teacherValidator.js'

const router = Router()

router.use(authenticate)

router.route('/')
  .post(authorize('SUPER_ADMIN', 'ADMIN'), validate(createTeacherSchema), createTeacher)
  .get(authorize('SUPER_ADMIN', 'ADMIN', 'TEACHER'), getAllTeachers)

router.route('/:id')
  .get(authorize('SUPER_ADMIN', 'ADMIN', 'TEACHER'), getTeacherById)
  .patch(authorize('SUPER_ADMIN', 'ADMIN'), validate(updateTeacherSchema), updateTeacher)
  .delete(authorize('SUPER_ADMIN', 'ADMIN'), deleteTeacher)

router.post('/assign-class', authorize('SUPER_ADMIN', 'ADMIN'), assignClass)
router.post('/assign-subject', authorize('SUPER_ADMIN', 'ADMIN'), assignSubject)

export default router
