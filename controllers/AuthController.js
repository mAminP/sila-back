import express from "express";
import {UserService} from '../services/UserService.js'
import {validator} from "../utils/JoiValidationUtil.js";
import {AuthSendValidationSmsSchema} from "../JoiSchemas/AuthSendValidationSmsSchema.js";
const AuthController = new express.Router()



AuthController.post('/send-validation-sms',
    validator.body(AuthSendValidationSmsSchema),
    async (req,res)=> {

    return res.send({...req.body})
})



export default AuthController
