import express from 'express'
import { login, register, logout, getCurrentUser } from '../controllers/auth.js'

export const authRouter = express.Router()

authRouter.post('/login', login)
authRouter.post('/register', register)
authRouter.post('/logout', logout)
authRouter.get('/me', getCurrentUser)
