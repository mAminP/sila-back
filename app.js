import express from 'express'
const app = express()
import router from './routes.js'
import cors from 'cors';
app.use(express.json())
app.use(cors())


// middlewares

router(app)
export default app
