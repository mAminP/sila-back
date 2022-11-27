import mongoose from "mongoose";
import {ColorSchema} from "./ColorSchema.js";


const PriceSchema = new mongoose.Schema({
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


PriceSchema.virtual('profit' )
    .get(function () {
        let discount = 0
        if (this.discount) {
            discount = 100 - ((this.discount * 100) / this.price)
        }
        const profit = Number((this.price * 100) / this.buyPrice) - 100
        return +profit - +discount
    })

PriceSchema.virtual('off').get(function () {
    if (!this.discount) {
        return 0
    }
    return 100 - Math.round((this.discount * 100) / this.price)
})
const PriceModel = new mongoose.model('Price', PriceSchema)

export {PriceModel}
