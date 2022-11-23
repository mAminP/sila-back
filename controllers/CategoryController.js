import express from "express";
import {CategoryService} from "../services/CategoryService.js";

const CategoryController = new express.Router()

CategoryController.get('/',
    async (req, res) => {
        res.send(await CategoryService.getAllCategories())
    })


CategoryController.post('/',
    async (req, res) => {
        const {nameFa, nameEn, image} = req.body
        const category = await CategoryService.createCategory({nameFa, nameEn, image})
        res.send(category)
    })
CategoryController.post('/:categoryId/category-child',
    async (req, res) => {
        const {nameFa, nameEn, image} = req.body
        const {categoryId} = req.params
        const category = await CategoryService.createCategoryChild(categoryId,{nameFa, nameEn, image})
        res.send(category)
    })
export default CategoryController
