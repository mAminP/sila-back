import todosRoute from './src/todos/routes.js'


export default function (app){
    app.use('/todos',todosRoute)
}