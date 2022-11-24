import Joi from "joi";
import JObjectId from "joi-objectid";
Joi.objectId = JObjectId(Joi);
export const ProductInputSchema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string(),
    categories:Joi.array().items(Joi.objectId()).min(1),
    images:Joi.array().items(Joi.objectId()),

})
export const ProductPriceInputSchema = Joi.object().keys({
    price: Joi.number().required(),
    discount: Joi.number()
})

export const ProductPriceParamsSchema = Joi.object().keys({
    productId:Joi.objectId().required()
})
