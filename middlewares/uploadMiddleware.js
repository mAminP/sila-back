import multer from 'multer'

const upload = multer({
    limits: {
        fileSize: 4 * 1024 * 1024,
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb( new Error('Please upload a valid image file'))
        }
        cb(undefined, true)
    }
})
export {upload}
