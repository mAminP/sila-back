import express from "express";
import {ProductService} from "../services/ProductService.js";
import {validator} from "../utils/JoiValidationUtil.js";
import {ProductInputSchema} from "../JoiSchemas/ProductInputSchema.js";

const ProductController = express.Router()


ProductController.get('/', async (req, res) => {
    res.send(await ProductService.getProducts())
})

ProductController.post('/', validator.body(ProductInputSchema), async (req, res) => {
    const product =  await ProductService.createProduct(req.body)
    res.status(201).send(product)
})

export default ProductController
