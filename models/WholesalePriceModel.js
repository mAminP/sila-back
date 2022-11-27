import mongoose from "mongoose";
import {ColorSchema} from "./ColorSchema.js";


const WholesalePriceSchema = new mongoose.Schema({
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
        // stock: {
        //     type: Number,
        //     required: true,
        // },
        // size: {
        //     type: Number,
        //     required: true
        // },
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


WholesalePriceSchema.virtual('off').get(function () {
    if (!this.discount) {
        return 0
    }
    // price    15,000
    // discount 13,500

    // 15000    13500
    // ------ = ------  =>  15000*x = 13500*100 => 13500*100/15000 = x
    //  100       x

    return 100 - Math.ceil((this.discount * 100) / this.price)
})
const WholesalePriceModel = new mongoose.model('WholesalePrice', WholesalePriceSchema)

export {WholesalePriceModel}
