import TrezSmsClient from 'trez-sms-client'
import MelipayamakApi from 'melipayamak'
import {$config} from "../config/index.js";

const clientTrezSmsClient = new TrezSmsClient($config.RAYGAN_SMS_USERNAME, $config.RAYGAN_SMS_PASSWORD);
const clientMelipayamakApi = new MelipayamakApi($config.MELLIPAYAMAK_SMS_USERNAME,$config.MELLIPAYAMAK_SMS_PASSWORD).sms();

async function sendSmsByMelliPayamak(phoneNumber, text) {
    return await clientMelipayamakApi.send(phoneNumber,$config.MELLIPAYAMAK_SMS_NUMBER, text)
}

async function sendSmsByRayganSms(phoneNumber, text) {
    return await clientTrezSmsClient.sendMessage(
        $config.RAYGAN_SMS_NUMBER,
        phoneNumber,
        text,
        clientTrezSmsClient.getRandomGroupId())
}

async function sendValidationCodeSms(phoneNumber) {
 const result =  await clientTrezSmsClient.autoSendCode(phoneNumber,`با تشکر ${$config.SITE_NAME}`)
    return result >= 2000
}

async function validateSentCode(phoneNumber,code) {
    return await clientTrezSmsClient.checkCode(phoneNumber,code)
}

export {
    sendSmsByMelliPayamak,
    sendSmsByRayganSms,
    sendValidationCodeSms,
    validateSentCode
}
