import { Router } from 'express'
import { getDashboardStats } from '../controllers/dashboardController.js'
import { authenticate } from '../middleware/auth.js'
import { authorize } from '../middleware/roleCheck.js'

const router = Router()

router.get('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), getDashboardStats)

export default router
