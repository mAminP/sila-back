import mongoose from "mongoose";

const ColorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
})
export {ColorSchema}
