import app from './app.js'
import mongoose from 'mongoose'
const port = 4000

async function run() {
    try {
        await  mongoose.connect('mongodb://localhost:27017/testsila')
        app.listen(port)
        console.log(` app listening on localhost:${port}`)
    } catch (e) {
        console.log('[ERROR]',e)
    }
}
run()


