import mongoose from "mongoose";
import app from "../app.js";
import fs from "fs";

const FileSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
            enum: ['image']
        },
        alt:{
            type: String,
            required: false
        },
        sort:{
            type:Number,
            required: false,
            default: 0
        }
    },
    {
        toObject: {virtuals: true},
        toJSON: {virtuals: true},
        timestamps: true
    })

FileSchema.virtual('path').get(function () {
    const fullUrl = app.request.protocol + '://' + app.request.get('host');
    return `${fullUrl}/images/${this.name}`
})
FileSchema.virtual('exists').get(function () {
    const path = './static/images/' + this.name
    return fs.existsSync(path)
})

const FileModel = new mongoose.model('File', FileSchema)

export {FileModel}
