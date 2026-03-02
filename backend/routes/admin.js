import express from 'express'
import { getStats, getAdminLocations, getAdminUsers } from '../controllers/admin.js'

export const adminRouter = express.Router()

adminRouter.get('/stats', getStats)
adminRouter.get('/locations', getAdminLocations)
adminRouter.get('/users', getAdminUsers)
