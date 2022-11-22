import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true,
        select: false
    }
}, {timestamps: true})
const UserModel = new mongoose.model('User', UserSchema)
export {UserModel}
