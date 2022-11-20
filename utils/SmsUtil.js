import TrezSmsClient from 'trez-sms-client'
import MelipayamakApi from 'melipayamak'
// const client = new TrezSmsClient(process.env.RayganSMSUserName, process.env.RayganSMSPassword);
const client = new MelipayamakApi(process.env.MELLIPAYAMAK_SMS_USERNAME, process.env.MELLIPAYAMAK_SMS_PASSWORD);
const sms = client.sms();

async function sendSms(phoneNumber, text) {
    return await sms.send(phoneNumber,30001230669336, text)
}

export {
    sendSms
}
