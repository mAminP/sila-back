import express from "express";
import {ProductService} from "../services/ProductService.js";
import {validator} from "../utils/JoiValidationUtil.js";
import {
    ProductInputSchema, ProductParamsSchema,
    ProductPriceInputSchema,
} from "../JoiSchemas/ProductInputSchema.js";
import ApiMessage from "../utils/ApiMessage.js";
import {ProductFilterQuerySchema} from "../JoiSchemas/ProductFilterQuerySchema.js";
import {PaginateItems} from "../utils/PaginateItems.js";
import {ProductModel} from "../models/ProductModel.js";

const ProductController = express.Router()


ProductController.get('/',
    validator.query(ProductFilterQuerySchema),
    async (req, res) => {
        const {page, limit, categories} = req.query
        const count = 3;
        const aggregate = []

        aggregate.push({
            $match: {status: 'show'}
        })

        aggregate.push({
            $lookup: {
                from: 'prices',
                localField: '_id',
                foreignField: 'product',
                as: 'prices',
                let: {
                    price: "$price",
                    discount: "$discount"
                },
                pipeline: [
                    {
                        $match: {
                            status: {
                                $in: ["in-stock"]
                            }
                        }
                    },
                    {
                        $addFields: {
                            "sellPrice": {
                                $cond: [
                                    {$ifNull: ["$discount", 0]},
                                    "$discount",
                                    "$price",
                                ]
                            }
                        }
                    },
                    {
                        $sort: {
                            sellPrice: 1
                        }
                    }
                ]

            }
        })

        if (categories) {
            console.log(categories)
            aggregate.push({

            })
        }

        aggregate.push(
            {
                $skip: ((page - 1) * limit),

            },
            {
                $limit: limit
            }
        )

        aggregate.push({
            $project: {
                _id: 1,
                title: 1,
                code: 1,
                colors: 1,
                sizes: 1,
                status: 1,
                description: 1,
                categories: 1,
                images: 1,
                tags: 1,
                price: {$arrayElemAt: ["$prices", 0]}
            }
        })
        const products = await ProductModel.aggregate(aggregate)

        return res.send(new PaginateItems(page, limit, count, products))
    })

ProductController.get('/:productId',
    validator.params(ProductParamsSchema),
    async (req, res) => {
        const product = await ProductService.getProductById(req.params.productId)
            .where({status: 'show'})

        if (!product) {
            return res.status(404).send(new ApiMessage({
                message: 'محصول یافت نشد'
            }))
        }
        return res.send(product)
    })

ProductController.post('/', validator.body(ProductInputSchema), async (req, res) => {
    try {
        if (await ProductService.anyProductByCode(req.body.code)) {
            return res.status(400).send(new ApiMessage({message: `محصول با شناسه ${req.body.code} قبلا ایجاد شده است.`}))
        }
        const product = await ProductService.createProduct(req.body)
        res.status(201).send(product)
    } catch (e) {
        return res.status(400).send(new ApiMessage({message: 'متاسفانه خطایی رخ داد'}))
    }
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
