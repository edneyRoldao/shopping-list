import { validationResult } from "express-validator";
import UserModel from "../models/user.model";
import CategoryModel from '../models/category.model';
import ShoppingListModel from '../models/list.model';


export default class ShoppingListController {

    async create(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }

            // obter usuario
            const user = await UserModel.findOne({ _id: req.body.userId });

            if (!user) {
                return res.status(400).json({errorMessage: 'user does not exist !'});
            }

            const category = await CategoryModel.findOne({ _id: req.body.categoryId })

            if (!category) {
                return res.status(400).json({errorMessage: 'category does not exist !'});
            }

            const shoppingList = new ShoppingListModel({
                userId: user._id,
                categoryId: category._id,
                description: req.body.description
            });

            const shoppingListSaved = await shoppingList.save();
            return res.status(201).json({listId: shoppingListSaved._id});

        } catch (err) {
            console.log(err);
            return res.status(500).json('there was an unexpected error when try to create a shopping list!');
        }
    }

    async list(req, res) {
        try {
            const userId = req.params.usuarioId;
            const list = await ShoppingListModel.find({ userId });
            return res.status(200).json(list);

        } catch (err) {
            console.log(err);
            return res.status(500).json('there was an unexpected error when try to get a shopping list!');
        }
    }

    async delete(req, res) {
        try {
            const listId = req.params.listId;
            ShoppingListModel.findByIdAndRemove(listId);
            return res.status(200).json({message: 'shopping list deleted'});

        } catch (err) {
            console.log(err);
            return res.status(500).json('app unable to delete due to an error');
        }
    }

    async getOne(req, res) {

    }

    async update(req, res) {

    }

    async filter(req, res) {

    }

}
