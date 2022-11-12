import express from 'express'
const app = express()
import router from './routes.js'
import todosRoute from './src/todos/routes.js'


app.use(express.json())



// middlewares



router(app)


export default app