import express from "express";
import {UserService} from "../services/UserService.js";

const UserController = new express.Router()


UserController.get('/', async (req, res) => {
    const users = await UserService.getUsers()
    res.send(users)
})


export default UserController
