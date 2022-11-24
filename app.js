import express from 'express'

const app = express()
import router from './routes.js'
import cors from 'cors';

app.use(express.static('static'))
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    app.request = req
    next()
})

// middlewares

router(app)
export default app
