import CategoryModel from '../models/category.model';
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export default class CategoryService {

    populateCategoryCollection() {
        const categories = [
            {description: 'food'},
            {description: 'electronic'},
            {description: 'kids'},
            {description: 'clothes'},
            {description: 'games'},
            {description: 'sports'}
        ];

        categories.forEach(cat => {
            const category = new CategoryModel({
                description: cat.description.toUpperCase()
            });

            category
                .save()
                .then(r => {
                    console.log('categories list has been persisted');
                })
                .catch(err => {
                    console.log('where was an error while trying to persist categories list', err);
                });
        });
    }

    findAll() {
        return CategoryModel.find();
    }

    getOne(id) {
        const isValid = ObjectId.isValid(id);

        if (isValid) {
            return CategoryModel.findOne({_id: id}) || {};
        }

        return {}
    }

}
