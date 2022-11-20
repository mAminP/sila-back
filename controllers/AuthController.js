import express from "express";
import {UserService} from '../services/UserService.js'
import {validator} from "../utils/JoiValidationUtil.js";
import {AuthSendValidationSmsSchema} from "../JoiSchemas/AuthSendValidationSmsSchema.js";
import ApiMessage from "../utils/ApiMessage.js";

const AuthController = new express.Router()


AuthController.post('/send-validation-sms',
    validator.body(AuthSendValidationSmsSchema),
    async (req, res) => {
        try {
            const {phoneNumber, type} = req.body
            if (type === 'newUser') {
                let user = await UserService.getUserByPhoneNumber(phoneNumber)
                if (user) {
                    return res.status(400).send(new ApiMessage({message: 'شما قبلا ثبت نام کرده اید'}))
                }
                user = await UserService.createUser({phoneNumber})
                res.send(user)
            } else {
                res.send({})
            }

        } catch (e) {
            res.status(400).send(new ApiMessage({message: 'Bad Request'}))
        }
    })


export default AuthController
