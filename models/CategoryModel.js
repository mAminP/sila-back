import mongoose from "mongoose";


const CategorySchema = new mongoose.Schema({
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
    }
}, {timestamps: true})


CategorySchema.virtual('children', {
    ref: 'CategoryChild',
    localField: '_id',
    foreignField: 'category'
});
CategorySchema.set('toObject', { virtuals: true });
CategorySchema.set('toJSON', { virtuals: true });
const CategoryModel = new mongoose.model('Category', CategorySchema)

export {CategoryModel}
