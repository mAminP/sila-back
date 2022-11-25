import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    count: {
        type:Number,
        required:true,
        default: 1
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    productPrice:{
        type: mongoose.Types.ObjectId,
        ref: 'ProductPrice',
        required: true,
    },
    order:{
        type:mongoose.Types.ObjectId,
        required: true,
        ref: 'Order'
    }

},{
    timestamps:true,
})

const CartModel = new mongoose.model('Cart',CartSchema)

export {CartModel}
