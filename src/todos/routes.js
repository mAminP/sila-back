import express from "express";
import {getTodos} from "./controller/index.js";

const router = express.Router()

// localhost:4000/todos
router.get('/', (req, res) => getTodos(req,res))

export default router