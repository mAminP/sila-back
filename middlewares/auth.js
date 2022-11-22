import jwt from "jsonwebtoken";
import {$config} from "../config/index.js";
import ApiMessage from "../utils/ApiMessage.js";
import {UserService} from "../services/UserService.js";
/**
 * @param role :string "user" | "admin" | null
 * */
export  const auth =(role)=>async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(401).send()


    let user = await jwt.verify(token, $config.TOKEN_SECRET);
    if (!user) return res.status(403).send()
    user = await UserService.getUserById(user._id).populate('role')
    if (role === 'user' && user.role=== "admin") return res.status(403).send(new ApiMessage({message:"require user role"}))
    if (role === 'admin' && user.role=== "user") return res.status(403).send(new ApiMessage({message:"require admin role"}))

    req.user = user
    next()
}
