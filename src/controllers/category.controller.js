import CategoryService from "../services/category.service";
const service = new CategoryService();

export default class CategoryController {

    async categoriesList(req, res) {
        try {
            const categories = await service.findAll();
            return res.status(200).json(categories);

        } catch (err) {
            console.log(err);
            return res.status(500).json('error when try to get categories');
        }
    }

}
