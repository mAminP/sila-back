import swaggerUI  from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import {$config} from "./config/index.js";




const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "A simple Express Library API",
        },
        servers: [
            {
                url: `http://localhost:${$config.PORT}`,
            },
        ],
    },
    apis: ["./controllers/*.js"],
};

export default function (app){
    const specs = swaggerJsDoc(options);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
}
