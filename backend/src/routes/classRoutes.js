import { Router } from 'express'
import { createClass, getAllClasses, getClassById, updateClass, deleteClass } from '../controllers/classController.js'
import { authenticate } from '../middleware/auth.js'
import { authorize } from '../middleware/roleCheck.js'

const router = Router()

router.use(authenticate)

router.route('/')
  .post(authorize('SUPER_ADMIN', 'ADMIN'), createClass)
  .get(authorize('SUPER_ADMIN', 'ADMIN', 'TEACHER'), getAllClasses)

router.route('/:id')
  .get(authorize('SUPER_ADMIN', 'ADMIN', 'TEACHER'), getClassById)
  .patch(authorize('SUPER_ADMIN', 'ADMIN'), updateClass)
  .delete(authorize('SUPER_ADMIN', 'ADMIN'), deleteClass)

export default router
