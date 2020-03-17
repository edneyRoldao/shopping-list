import { validationResult } from "express-validator";
import UserModel from "../models/user.model";
import CategoryModel from '../models/category.model';
import ShoppingListModel from '../models/shoppingList.model';


export default class ShoppingListController {

    async createList(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }

            const user = await UserModel.findOne({ _id: req.params.userId });

            if (!user) {
                return res.status(400).json({errorMessage: 'user does not exist !'});
            }

            const category = await CategoryModel.findOne({ _id: req.body.categoryId });

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
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }

            const userId = req.params.userId;
            const list = await ShoppingListModel.find({ userId });
            return res.status(200).json(list);

        } catch (err) {
            console.log(err);
            return res.status(500).json('there was an unexpected error when try to get a shopping list!');
        }
    }

    async delete(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }

            const userId = req.params.userId;
            const listId = req.params.listId;
            const listDeleted = await ShoppingListModel.findOneAndRemove({ _id: listId, userId: userId }).exec();

            if (listDeleted) {
                return res.status(200).json({message: 'shopping list deleted'});
            }

            return res.status(400).json({message: 'there is no list to be removed for this user'});

        } catch (err) {
            console.log(err);
            return res.status(500).json('app unable to delete due to an error');
        }
    }

    async getOne(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }

            const userId = req.params.userId;
            const listId = req.params.listId;

            const list = await ShoppingListModel.findOne({ _id: listId, userId: userId });
            return res.status(200).json(list || []);

        } catch (err) {
            console.log(err);
            return res.status(500).json('there was an error when try to get the list');
        }
    }

    async update(req, res) {

    }

    async filter(req, res) {

    }

}
