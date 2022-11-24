import express from "express";
import {ProductService} from "../services/ProductService.js";
import {validator} from "../utils/JoiValidationUtil.js";
import {
    ProductInputSchema,
    ProductPriceInputSchema,
    ProductPriceParamsSchema
} from "../JoiSchemas/ProductInputSchema.js";
import ApiMessage from "../utils/ApiMessage.js";

const ProductController = express.Router()


ProductController.get('/', async (req, res) => {
    res.send(await ProductService.getProducts())
})

ProductController.post('/', validator.body(ProductInputSchema), async (req, res) => {
    const product = await ProductService.createProduct(req.body)
    res.status(201).send(product)
})

ProductController.post('/:productId/prices',
    validator.body(ProductPriceInputSchema),
    validator.params(ProductPriceParamsSchema),
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
    validator.params(ProductPriceParamsSchema),
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
