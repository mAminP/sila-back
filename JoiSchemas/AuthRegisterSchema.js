import Joi from "joi";
import {defaultSchemas} from "./index.js";

export const AuthRegisterSchema =  Joi.object().keys({
   phoneNumber: defaultSchemas.phoneNumber,
   firstName: Joi.string().required(),
   lastName: Joi.string().required(),
   password: Joi.string().required(),
})
