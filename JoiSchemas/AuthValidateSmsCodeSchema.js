import Joi from "joi";
import {defaultSchemas} from "./index.js";

export const AuthValidateSmsCodeSchema =  Joi.object().keys({
   phoneNumber: defaultSchemas.phoneNumber,
   code: Joi.number().required()
})
