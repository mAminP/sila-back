import express from 'express'
import router from './routes.js'
import cors from 'cors';

const app = express()

app.use(express.static('static'))
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    app.fullUrl = req.protocol + '://' + req.get('host')
    next()
})

// middlewares

router(app)
export default app
