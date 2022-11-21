import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    phoneNumber:{
        type: String,
        required: true
    },
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    passwordHash:{
        type:String,
        required: true
    }
},{timestamps: true})
const UserModel = new mongoose.model('User',UserSchema)
export {UserModel}
