import Joi from "joi";
import JObjectId from "joi-objectid";


Joi.objectId = JObjectId(Joi);
export const ProductInputSchema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string(),
    categories: Joi.array().items(Joi.objectId()).min(1),
    images: Joi.array().items(Joi.objectId()),
    code: Joi.string().required(),
    sizes: Joi.array().required().min(1),
    tags: Joi.array().required().items(Joi.string()),
    colors:Joi.array().required().min(1).items(
        Joi.array().required().min(1).items(
            Joi.object().keys({
                name: Joi.string().required(),
                code: Joi.string().required()
            })
        )
    )

})
export const ProductPriceInputSchema = Joi.object().keys({
    buyPrice: Joi.number().required(),
    price: Joi.number().required(),
    discount: Joi.number(),
    color: Joi.array().required().items(Joi.object().keys({
        name: Joi.string().required(),
        code: Joi.string().required()
    })).min(1),
    stock: Joi.number().required(),
    size: Joi.number().required()
})

export const ProductParamsSchema = Joi.object().keys({
    productId: Joi.objectId().required()
})
