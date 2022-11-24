import fs from 'fs'
import * as uuid from "uuid";
import sharp from 'sharp'
import {FileModel} from "../models/FileModel.js";

const root = './static'
const distImage = root + '/images/'

const checkDistExist = (dist) => {
    if (!fs.existsSync(dist)) {
        fs.mkdirSync(dist, {recursive: true})
    }
}
const fileName = (file) => {
    const ext = `.${file.originalname.split('.').at(-1)}`
    return uuid.v4() + ext
}
export const UploadService = {

    async saveImage(file) {
        if (!file) {
            throw new Error("file not sent to save")
        }
        checkDistExist(distImage)
        const filename = fileName(file)
        const filePath = distImage + filename
        await sharp(file.buffer).toFile(filePath)
        const model = await FileModel.create({
            name: filename, type: 'image'
        })
        return await this.getFileById(model._id)
    },

    async getFiles() {
        return FileModel.find({})
    },
    async updateFileById(_id, {alt, sort}) {
        return await FileModel.findOneAndUpdate({_id}, {$set: {alt, sort}})
    },
    async getFileById(_id) {
        return  await FileModel.findOne({_id});
    }
}
