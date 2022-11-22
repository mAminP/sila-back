import * as dotenv from 'dotenv'
dotenv.config()


export const $config = {
    SITE_NAME:"چرم سیلا",
    TOKEN_SECRET:process.env.TOKEN_SECRET,
    PORT:process.env.PORT,
    DB_URI:process.env.DB_URI,
    MELLIPAYAMAK_SMS_USERNAME:process.env.MELLIPAYAMAK_SMS_USERNAME,
    MELLIPAYAMAK_SMS_PASSWORD:process.env.MELLIPAYAMAK_SMS_PASSWORD,
    MELLIPAYAMAK_SMS_NUMBER:process.env.MELLIPAYAMAK_SMS_NUMBER,
    RAYGAN_SMS_USERNAME:process.env.RAYGAN_SMS_USERNAME,
    RAYGAN_SMS_PASSWORD:process.env.RAYGAN_SMS_PASSWORD,
    RAYGAN_SMS_NUMBER:process.env.RAYGAN_SMS_NUMBER,
}
