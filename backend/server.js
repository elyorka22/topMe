import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { locationsRouter } from './routes/locations.js'
import { usersRouter } from './routes/users.js'
import { authRouter } from './routes/auth.js'
import { adminRouter } from './routes/admin.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'TopMe API is running' })
})

app.use('/api/locations', locationsRouter)
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter)

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
