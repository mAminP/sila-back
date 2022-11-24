import Joi from "joi";

export const FileSchema =Joi.object().keys({
    sort: Joi.number(),
    alt: Joi.string()
})
