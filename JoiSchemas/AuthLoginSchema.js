import Joi from "joi";
import {defaultSchemas} from "./index.js";

export const AuthLoginSchema =  Joi.object().keys({
   phoneNumber: defaultSchemas.phoneNumber,
   password: Joi.string().required(),
})
