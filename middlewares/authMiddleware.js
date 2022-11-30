import jwt from "jsonwebtoken";
import {$config} from "../config/index.js";
import ApiMessage from "../utils/ApiMessage.js";
import {UserService} from "../services/UserService.js";

/**
 * @param roles :[string] "user" | "seller" | "marketer" | "admin" | null
 * */
export const auth = (roles) => async (req, res, next) => {
   try {
    if (roles && !Array.isArray(roles)) {
        throw new Error('roles param is not valid')
    }
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(401).send(new ApiMessage({message: "require auth"}))


    let user = await jwt.verify(token, $config.TOKEN_SECRET);
    if (!user) return res.status(403).send()
    user = await UserService.getUserById(user._id).populate('roles')
    if (roles) {
        roles.foreach((role) => {
            if (roles.include(role) && !user.roles.includes(role))
                return res.status(401).send(new ApiMessage({message: `require ${role} role`}))
        })
    }
    req.user = user
    next()
   } catch (error) {
    res.status(401).send(new ApiMessage({message:'authorization faild'}))
   }
}
