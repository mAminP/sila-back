
import app from './app.js'

import mongoose from 'mongoose'
import {$config} from "./config/index.js";
const port = $config.PORT || 4000
async function run() {
    try {
        console.log('connecting to database ...')
        await  mongoose.connect($config.DB_URI)
        console.log('database connected !!!')

         app.listen(port)


        console.log(`==>  listening on http://localhost:${port}`)

    } catch (e) {
        console.log('[ERROR]',e)
    }
}
run()


