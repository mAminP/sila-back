import AuthController from "./controllers/AuthController.js";
import UserController from "./controllers/UserController.js";


export default function (app){
    app.use('/auth',AuthController)
    app.use('/users',UserController)
}
