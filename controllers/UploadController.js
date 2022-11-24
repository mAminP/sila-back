import express from "express";
import {upload} from "../middlewares/uploadMiddleware.js";
import {UploadService} from "../services/UploadService.js";
import ApiMessage from "../utils/ApiMessage.js";
import {validator} from "../utils/JoiValidationUtil.js";
import {FileSchema} from "../JoiSchemas/FileSchema.js";

const UploadController = new express.Router()

UploadController.get('/files', async (req, res) => {
    res.send(await UploadService.getFiles())
})

UploadController.post('/',
    upload.single('image'),
    validator.body(FileSchema),
    async (req, res) => {
        try {
            const {alt, sort} = req.body
            let image = await UploadService.saveImage(req.file)
            if (alt || sort) {
                image = await UploadService.updateFileById(image._id, {alt, sort})
                image = await UploadService.getFileById(image._id)
            }
            res.send(image)
        } catch (e) {
            res.status(400).send(new ApiMessage({message: 'Bad Request'}))
        }
    })

export default UploadController
