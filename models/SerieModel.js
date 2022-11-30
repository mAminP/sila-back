import mongoose from "mongoose";

const SerieSchema = new mongoose.Schema({
    product:{
        type:mongoose.Types.ObjectId,
        ref:'Product',
        required: true
    },

},
{
  timestamps:true ,
    toObject: {virtuals: true},
    toJSON: {virtuals: true},
})

SerieSchema.virtual('serieWholesalePrices', {
    ref: 'serieWholesalePrice',
    localField: '_id',
    foreignField: 'serie'
});

const SerieWholesaleModel = new mongoose.model('Serie',SerieSchema)
export  {SerieWholesaleModel}
