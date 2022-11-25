import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        code: {
            type: String,
            unique: true,
            required: true
        },
        status: {
            type: String,
            enum: ["show", "suspended", "disable"],
            required: true,
            default: "suspended",
            select: false
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
        tags: [
            {
                type: String,
                required: true
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
