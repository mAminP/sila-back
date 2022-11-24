import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        categories: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'CategoryChild'
            }
        ],
        images: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'File'
            }
        ],
    },
    {
        toObject: {virtuals: true},
        toJSON: {virtuals: true},
        timestamps: true
    }
)


ProductSchema.virtual('prices', {
    ref: 'Price',
    localField: '_id',
    foreignField: 'product'
});

const ProductModel = new mongoose.model('Product', ProductSchema)

export {ProductModel}
