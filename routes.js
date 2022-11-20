import AuthController from "./controllers/AuthController.js";


export default function (app){
    app.use('/auth',AuthController)
}
