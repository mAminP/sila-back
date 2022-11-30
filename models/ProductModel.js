import mongoose from "mongoose";
import {ColorSchema} from "./ColorSchema.js";


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
        colors: [
            [ // چند رنگ
                {
                    type: ColorSchema,
                    required: true
                }
            ]
        ],
            // سایز های قابل ارائه
        sizes: {
            type: [Number],
            required: true,
            index: true
        },
    // وضعیت
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
// ProductSchema.virtual('price', {
//     ref: 'Price',
//     localField: '_id',
//     foreignField: 'product',
//     justOne: true,
//     options:{
//         match: {
//             status: {
//                 $in: ['in-stock', 'order']
//             }
//         },
//         sort:{
//             off: 1
//         }
//     }
// })

ProductSchema.virtual('prices', {
    ref: 'Price',
    localField: '_id',
    foreignField: 'product'
});
ProductSchema.virtual('wholesalePrices', {
    ref: 'WholesalePrice',
    localField: '_id',
    foreignField: 'product'
});
ProductSchema.virtual('series', {
    ref: 'Serie',
    localField: '_id',
    foreignField: 'product'
});
const ProductModel = new mongoose.model('Product', ProductSchema)

export {ProductModel}
