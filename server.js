import * as dotenv from 'dotenv'
dotenv.config()
import app from './app.js'
import mongoose from 'mongoose'
import {sendSms} from "./utils/SmsUtil.js";
const port = 4000

async function run() {
    try {
        await  mongoose.connect(process.env.DB_URI)
        app.listen(port)
        console.log(` app listening on localhost:${port}`)

       // const res =  await sendSms("09146672256","Amin")
       //  console.log(res)
    } catch (e) {
        console.log('[ERROR]',e)
    }
}
run()


