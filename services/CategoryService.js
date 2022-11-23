import {CategoryModel} from "../models/CategoryModel.js";
import {CategoryChildModel} from "../models/CategoryChildModel.js";

export const CategoryService = {

    async getAllCategories() {
        return CategoryModel.find({}).populate({path: 'children'})
    },
    async createCategory({nameFa, nameEn, image}) {
        const item = new CategoryModel({
            nameFa, nameEn, image
        })

        await item.save()
        return item
    },
    async createCategoryChild(categoryId, {nameFa, nameEn, image}) {
        const item = new CategoryChildModel({
            nameFa, nameEn, image, category: categoryId
        })

        await item.save()
        return item
    }
}
