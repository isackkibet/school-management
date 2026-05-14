import { Router } from 'express'
import { createSubject, getAllSubjects, getSubjectById, updateSubject, deleteSubject } from '../controllers/subjectController.js'
import { authenticate } from '../middleware/auth.js'
import { authorize } from '../middleware/roleCheck.js'

const router = Router()

router.use(authenticate)

router.route('/')
  .post(authorize('SUPER_ADMIN', 'ADMIN'), createSubject)
  .get(authorize('SUPER_ADMIN', 'ADMIN', 'TEACHER'), getAllSubjects)

router.route('/:id')
  .get(authorize('SUPER_ADMIN', 'ADMIN', 'TEACHER'), getSubjectById)
  .patch(authorize('SUPER_ADMIN', 'ADMIN'), updateSubject)
  .delete(authorize('SUPER_ADMIN', 'ADMIN'), deleteSubject)

export default router
