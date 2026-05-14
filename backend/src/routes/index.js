import { Router } from 'express'
import authRoutes from './authRoutes.js'
import studentRoutes from './studentRoutes.js'
import teacherRoutes from './teacherRoutes.js'
import classRoutes from './classRoutes.js'
import subjectRoutes from './subjectRoutes.js'
import attendanceRoutes from './attendanceRoutes.js'
import examRoutes from './examRoutes.js'
import feeRoutes from './feeRoutes.js'
import dashboardRoutes from './dashboardRoutes.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/students', studentRoutes)
router.use('/teachers', teacherRoutes)
router.use('/classes', classRoutes)
router.use('/subjects', subjectRoutes)
router.use('/attendance', attendanceRoutes)
router.use('/exams', examRoutes)
router.use('/fees', feeRoutes)
router.use('/dashboard', dashboardRoutes)

export default router
