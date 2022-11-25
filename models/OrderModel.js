import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['in-order'],
        required:true,
        default: 'in-order'
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref: 'User',
        required:true
    }

},{
    toObject: {virtuals: true},
    toJSON: {virtuals: true},
    timestamps: true
})

OrderSchema.virtual('items', {
    ref: 'Cart',
    localField: '_id',
    foreignField: 'order'
});
const OrderModel = new mongoose.model('Order',OrderSchema)

export {OrderModel}
