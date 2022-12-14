import {ProductModel} from "../models/ProductModel.js";
import {PriceService} from "./PriceService.js";
import ApiMessage from "../utils/ApiMessage.js";
import {PriceModel} from "../models/PriceModel.js";

export const ProductService = {

    anyProductByCode(code){
        return ProductModel.exists({code})
    },

    getProductById(_id) {
        return ProductModel
            .findOne({_id})
            .populate('images')
            .populate('price')
            .populate({
                path: 'prices',

                match: {
                    status: {
                        $in: ['in-stock', 'order']
                    }
                },
                // select:{
                //     profit : false
                // }

            })
            .populate({path: 'categories', populate: 'category'})
    },
    getProducts() {
        return ProductModel.find({})
            .populate('images')
        // .populate({path: 'prices', match:{ status: 'in-stock' }})
        // .populate({path: 'categories', populate: 'category'})
    },
    async createProduct(body) {
        const newProduct = new ProductModel(body)
        await newProduct.save()
        // .then(t => t.populate('images'))
        // .then(t => t.populate({path: 'categories', populate: 'category'}))
        return newProduct;
    },
    async addPrice(productId, body) {
        const data = {
            product: productId,
            ...body
        }

        return PriceService.createPrice(data)
    },
    async getProductPrices(productId) {
        const product = await ProductModel.exists({_id: productId})
        if (!product) {
            return new ApiMessage({message: "محصول یافت نشد"})
        }
        return PriceModel.find({product: productId})
    }
}
