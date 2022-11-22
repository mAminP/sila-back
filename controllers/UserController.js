import express from "express";
import {UserService} from "../services/UserService.js";
import {auth} from "../middlewares/auth.js";

const UserController = new express.Router()


UserController.get('/', auth("admin") ,async (req, res) => {
    const users = await UserService.getUsers()
    res.send(users)
})


export default UserController
