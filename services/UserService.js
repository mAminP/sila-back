import {UserModel} from '../models/UserModel.js'


export  class UserService {

    static async getUsers() {
        return UserModel.find({});
    }

}
