import Joi from "joi";
import {defaultSchemas} from "./index.js";
import JObjectId from "joi-objectid";


Joi.objectId = JObjectId(Joi);
export const ProductFilterQuerySchema =  Joi.object().keys({
   page : Joi.number().default(1),
   limit : Joi.number().default(10),
   categories: Joi.array().items(Joi.objectId())
})
