import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'

import routes from './routes/index.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()
const PORT = process.env.PORT || 5000
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173'

app.use(helmet())
app.use(cors({ origin: corsOrigin, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
morgan.token('body', (req) => {
  if (!req.body || Object.keys(req.body).length === 0) return ''
  const safeBody = { ...req.body }
  if (safeBody.password) safeBody.password = '[REDACTED]'
  return JSON.stringify(safeBody)
})
app.use(morgan(':method :url :status :response-time ms - :res[content-length] bytes :body'))

// rate limiting — keep the api safe
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
})
app.use('/api', limiter)

app.use('/api', routes)

// health check
app.get('/health', (_req, res) => {
  res.json({ success: true, status: 'ok', timestamp: new Date().toISOString() })
})

// FIXME: cleanup error middleware
app.use(errorHandler)

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Stop the existing server or set PORT to another value.`)
    process.exit(1)
  }

  console.error('Server failed to start:', error)
  process.exit(1)
})
