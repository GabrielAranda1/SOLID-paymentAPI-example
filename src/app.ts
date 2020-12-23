import dotenv from 'dotenv'
import express from 'express'

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
})

import { router } from './routes'

const app = express()

app.use(express.json())

app.use(router)

export default app
