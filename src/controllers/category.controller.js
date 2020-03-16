import CategoryModel from '../models/category.model';
import categoryService from '../services/category.service';

export default class CategoryController {

    async list(req, res) {
        try {
            let categories = await CategoryModel.find();

            if (!categories.length) {
                categoryService();
            }

            categories = await CategoryModel.find();
            return res.status(200).json(categories);

        } catch (err) {
            console.log(err);
            return res.status(500).json('error when try to get categories');
        }
    }

}
