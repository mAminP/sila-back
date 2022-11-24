import {ProductModel} from "../models/ProductModel.js";

export const ProductService = {
    async getProductById(_id) {
        return ProductModel.findOne({_id}).populate('images').populate({path: 'categories', populate: 'category'})
    },
    async getProducts() {
        return ProductModel.find({}).populate('images').populate({path: 'categories', populate: 'category'})
    },
    async createProduct(body) {
        const newProduct = new ProductModel(body)
        await newProduct.save()
            .then(t => t.populate('images'))
            .then(t => t.populate({path: 'categories', populate: 'category'}))
        return newProduct;
    }
}
