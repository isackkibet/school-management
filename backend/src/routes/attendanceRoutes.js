import { Router } from 'express'
import {
  markAttendance, getAttendanceByClass, getAttendanceByStudent, updateAttendance, getAttendanceSummary,
} from '../controllers/attendanceController.js'
import { authenticate } from '../middleware/auth.js'
import { authorize } from '../middleware/roleCheck.js'
import { validate } from '../middleware/validate.js'
import { markAttendanceSchema, updateAttendanceSchema } from '../validators/attendanceValidator.js'

const router = Router()

router.use(authenticate)

router.post('/', authorize('SUPER_ADMIN', 'ADMIN', 'TEACHER'), validate(markAttendanceSchema), markAttendance)
router.get('/summary', authorize('SUPER_ADMIN', 'ADMIN', 'TEACHER'), getAttendanceSummary)
router.get('/class/:classId', authorize('SUPER_ADMIN', 'ADMIN', 'TEACHER'), getAttendanceByClass)
router.get('/student/:studentId', authorize('SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT', 'PARENT'), getAttendanceByStudent)
router.patch('/:id', authorize('SUPER_ADMIN', 'ADMIN', 'TEACHER'), validate(updateAttendanceSchema), updateAttendance)

export default router
