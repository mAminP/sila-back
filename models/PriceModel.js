import mongoose from "mongoose";


const PriceSchema = new mongoose.Schema({
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
                name: {
                    type: String,
                    required: true
                },
                code: {
                    type: String,
                    required: true
                }
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


PriceSchema.virtual('off').get(function () {
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
const PriceModel = new mongoose.model('Price', PriceSchema)

export {PriceModel}
