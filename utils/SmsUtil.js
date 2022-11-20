import TrezSmsClient from 'trez-sms-client'

const client = new TrezSmsClient(process.env.RayganSMSUserName, process.env.RayganSMSPassword);


async function  sendSms(phoneNumber,text){
    return await client.autoSendCode(phoneNumber, text)
}

export {
    sendSms
}
