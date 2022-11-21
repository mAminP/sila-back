'use strict';
import express from "express";
import {UserService} from '../services/UserService.js'
import {validator} from "../utils/JoiValidationUtil.js";
import {AuthSendValidationSmsSchema} from "../JoiSchemas/AuthSendValidationSmsSchema.js";
import ApiMessage from "../utils/ApiMessage.js";
import {AuthRegisterSchema} from "../JoiSchemas/AuthRegisterSchema.js";
import {sendValidationCodeSms} from "../utils/SmsUtil.js";


const AuthController = new express.Router()
/**
 * @swagger
 * components:
 *   schemas:
 *    ValidationInput:
 *      type: object
 *      required: true
 *          - phoneNumber
 *          - type
 *      properties:
 *          phoneNumber:
 *            type: string
 *            description: The auto-generated id of the book
 *          type:
 *            type: string
 *            description: The book title
 *      example:
 *            phoneNumber: "9359669336"
 *            type: "newUser"
 */



/**
 * @swagger
 * /auth/send-validation-sms:
 *   post:
 *     summary: send sms validation code
 *     tags: [Auth]
 *     produces:
 *        - application/json
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ValidationInput'
 */


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
                const result =  await sendValidationCodeSms(phoneNumber)
                if (!result){
                    res.status(400).send(new ApiMessage({message: 'Bad Request'}))
                }
                res.send(new ApiMessage({message: `کد تایید به شماره ${phoneNumber} ارسال شد`}))
            } else {
                res.send({})
            }

        } catch (e) {
            res.status(400).send(new ApiMessage({message: 'Bad Request'}))
        }
    })


AuthController.post('/register',
    validator.body(AuthRegisterSchema),
    async (req, res) => {
        try {
            const {phoneNumber, firstName,lastName,password} = req.body
                let user = await UserService.getUserByPhoneNumber(phoneNumber)
                if (user) {
                    return res.status(400).send(new ApiMessage({message: 'شما قبلا ثبت نام کرده اید'}))
                }
                const passwordHash= await UserService.hashPassword(password)
                user = await UserService.createUser({phoneNumber,firstName,lastName,passwordHash})
                res.send(user)
        } catch (e) {
            res.status(400).send(new ApiMessage({message: 'Bad Request'}))
        }
    })




export default AuthController
