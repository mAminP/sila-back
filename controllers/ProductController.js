import express from "express";
import {ProductService} from "../services/ProductService.js";
import {validator} from "../utils/JoiValidationUtil.js";
import {
    ProductInputSchema, ProductParamsSchema,
    ProductPriceInputSchema,
} from "../JoiSchemas/ProductInputSchema.js";
import ApiMessage from "../utils/ApiMessage.js";

const ProductController = express.Router()


ProductController.get('/', async (req, res) => {
    const products =await ProductService.getProducts().where({status: 'show'})
    return  res.send(products)
})

ProductController.get('/:productId',
    validator.params(ProductParamsSchema),
    async (req, res) => {
        const product = await ProductService.getProductById(req.params.productId)
            .where({status: 'show'})
            .lean()
        if (!product) {
            return res.status(404).send(new ApiMessage({
                message: 'محصول یافت نشد'
            }))
        }
        return res.send(product)
    })

ProductController.post('/', validator.body(ProductInputSchema), async (req, res) => {
    const product = await ProductService.createProduct(req.body)
    res.status(201).send(product)
})

ProductController.post('/:productId/prices',
    validator.body(ProductPriceInputSchema),
    validator.params(ProductParamsSchema),
    async (req, res) => {
        try {
            const {productId} = req.params
            const price = await ProductService.addPrice(productId, req.body)
            res.status(201).send(price)
        } catch (e) {
            res.status(400).send(new ApiMessage({message: 'Bad Request'}))
        }
    })
ProductController.get('/:productId/prices',
    validator.params(ProductParamsSchema),
    async (req, res) => {
        try {
            const {productId} = req.params
            const prices = await ProductService.getProductPrices(productId)
            res.status(201).send(prices)
        } catch (e) {
            res.status(400).send(new ApiMessage({message: 'Bad Request'}))
        }
    })
export default ProductController
