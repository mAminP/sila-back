import AuthController from "./controllers/AuthController.js";
import UserController from "./controllers/UserController.js";
import CategoryController from "./controllers/CategoryController.js";
import UploadController from "./controllers/UploadController.js";


export default function (app){
    app.use('/auth',AuthController)
    app.use('/categories',CategoryController)
    app.use('/users',UserController)
    app.use('/upload',UploadController)
}
