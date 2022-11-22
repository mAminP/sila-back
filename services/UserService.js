import {UserModel} from '../models/UserModel.js'
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import {$config} from "../config/index.js";

const passwordSalt = 10

export const UserService = {
    getUsers: async () => {
        return UserModel.find({});
    },
    getUserByPhoneNumber(phoneNumber) {
        return UserModel.findOne({phoneNumber})
    },
    getUserById(_id) {
        return UserModel.findOne({_id})
    },
    async createUser({phoneNumber, firstName, lastName, passwordHash}) {
        const user = new UserModel({
            phoneNumber,
            firstName,
            lastName,
            passwordHash,
            role: 'user'
        })

        await user.save()

        return user

    },
    async hashPassword(password) {
        const salt = bcrypt.genSaltSync(passwordSalt);
        return await bcrypt.hash(String(password), salt)
    },
    async checkPassword(password, passwordHash) {
        return await bcrypt.compare(String(password), String(passwordHash))
    },
    async generateToken(user) {
        return await jwt.sign({_id: user._id, role: user.role}, $config.TOKEN_SECRET,{

        })
    }
}
