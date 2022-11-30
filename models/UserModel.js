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
    roles: {
        type: [String],
        enum: ['user', 'admin', 'marketer', 'seller'],
        default: ['user'],
        required: true,
        select: false
    }
}, { timestamps: true })
const UserModel = new mongoose.model('User', UserSchema)
export { UserModel }
