import mongoose from "mongoose";

const SerieWholesalePriceSchema = new mongoose.Schema({
        count: {
            type: Number,
            required: true,
            default: 1
        },
        serie: {
            type: mongoose.Types.ObjectId,
            ref: "Serie"
        },
        wholesalePrice: {
            type: mongoose.Types.ObjectId,
            ref: "WholesalePrice"
        }

    },
    {
        timestamps: true,
        toObject: {virtuals: true},
        toJSON: {virtuals: true},
    })


const SerieWholesalePriceModel = new mongoose.model('SerieWholesalePrice', SerieWholesalePriceSchema)
export {SerieWholesalePriceModel}
