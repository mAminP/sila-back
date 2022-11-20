import Joi from "joi";

export const defaultSchemas = {
    phoneNumber: Joi.string()
        .required()
        .regex(/^(\+98|0)?9\d{9}$/)
        .custom((value)=>{
            return value.slice(-10)
        })
}
