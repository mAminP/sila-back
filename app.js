import express from 'express'
const app = express()
import router from './routes.js'
import swagger from './swagger.js'

app.use(express.json())



// middlewares

router(app)
swagger(app)
export default app
