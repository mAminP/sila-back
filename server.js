import * as dotenv from 'dotenv'
dotenv.config()
import app from './app.js'
import mongoose from 'mongoose'
import {sendSms} from "./utils/SmsUtil.js";
const port = process.env.PORT || 4000

async function run() {
    try {
        await  mongoose.connect(process.env.DB_URI)
        app.get('/',async (req, res) => {
            const s = await sendSms('09364384344', 'از سایت')
            res.send(s)
        })


        app.listen(port)


        console.log(`==>  listening on http://localhost:${port}`)

    } catch (e) {
        console.log('[ERROR]',e)
    }
}
run()


