import Joi from "joi";
import {defaultSchemas} from "./index.js";

export const AuthSendValidationSmsSchema =  Joi.object().keys({
   phoneNumber: defaultSchemas.phoneNumber,
   type: Joi.string().valid('newUser').required()
})
