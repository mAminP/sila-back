import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: false
    },
    categories:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'CategoryChild'
        }
    ],
    images:[
        {
            type:mongoose.Types.ObjectId,
            ref: 'File'
        }
    ],
})




const ProductModel = new mongoose.model('Product',ProductSchema)

export {ProductModel}
