import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    phoneNumber:{
        type: String
    }
},{timestamps: true})
const UserModel = new mongoose.model('User',UserSchema)
export {UserModel}
