import mongoose from "mongoose";
import {ColorSchema} from "./ColorSchema.js";


const WholesalePriceSchema = new mongoose.Schema({
        buyPrice: {
            type: Number,
            required: true,
            select: false
        },
        price: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            required: false
        },
        product: {
            type: mongoose.Types.ObjectId,
            ref: 'Product'
        },
        color: [
            {
                type: ColorSchema,
                required: true
            }
        ],
        stock: {
            type: Number,
            required: true,
            default: 0
        },
        size: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ["in-stock", "order", "done"],
            required: true,
            default: "in-stock"
        }
    },
    {
        toObject: {virtuals: true},
        toJSON: {virtuals: true},
        timestamps: true
    })

WholesalePriceSchema.virtual('serieWholesalePrices', {
    ref: 'serieWholesalePrice',
    localField: '_id',
    foreignField: 'wholesalePrice'
});

WholesalePriceSchema.virtual('off').get(function () {
    if (!this.discount) {
        return 0
    }
    return 100 - Math.ceil((this.discount * 100) / this.price)
})
const WholesalePriceModel = new mongoose.model('WholesalePrice', WholesalePriceSchema)

export {WholesalePriceModel}
