import mongoose from "mongoose";


const CategoryChildSchema = new mongoose.Schema({
    nameFa: {
        type: String,
        required: true,
        unique: true
    },
    nameEn: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: false,
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref: 'Category'
    }
}, {timestamps: true})
const CategoryChildModel = new mongoose.model('CategoryChild', CategoryChildSchema)
export {CategoryChildModel}
