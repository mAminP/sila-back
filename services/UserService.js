import {UserModel} from '../models/UserModel.js'


export const UserService = {
    getUsers: async () => {
        return UserModel.find({});
    },
    async getUserByPhoneNumber(phoneNumber) {
        return await UserModel.findOne({phoneNumber})
    },
    async createUser({phoneNumber}) {
            const user = new UserModel({
                phoneNumber
            })

            await user.save()

            return user

    }
}
