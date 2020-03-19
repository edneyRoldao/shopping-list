import { validationResult } from "express-validator";
import UserModel from "../models/user.model";
import CategoryModel from '../models/category.model';
import ShoppingListModel from '../models/shoppingList.model';
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;


export default class ShoppingListController {

    async createList(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }

            const user = await UserModel.findOne({ _id: req.body.userId });

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

    async getAllLists(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }

            const filter = {
                userId: req.body.userId
            };

            if (req.query.description) {
                filter.description = { $regex: `.*${req.query.description}.*` };
            }

            if (req.query.categoryId) {
                const isInvalid = !ObjectId.isValid(req.query.categoryId);

                if (isInvalid) {
                    return res.status(400).json({errorMessage: 'categoryId is invalid. It should be a string with 12 bytes or 24 hex characters'})
                }

                filter.categoryId = req.query.categoryId;
            }

            if (req.query.created) {
                filter.created = req.query.created;
            }

            const lists = await ShoppingListModel.find(filter);
            return res.status(200).json(lists || []);

        } catch (err) {
            console.log(err);
            return res.status(500).json('there was an unexpected error when try to get a shopping list!');
        }
    }

    async getOneList(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }

            const userId = req.body.userId;
            const listId = req.params.listId;
            const list = await ShoppingListModel.findOne({ userId, _id: listId });
            return res.status(200).json(list || {});

        } catch (err) {
            console.log(err);
            return res.status(500).json('there was an unexpected error when try to get a shopping list!');
        }
    }

    async removeList(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }

            const userId = req.body.userId;
            const listId = req.params.listId;
            const listDeleted = await ShoppingListModel.findOneAndRemove({ _id: listId, userId }).exec();

            if (listDeleted) {
                return res.status(200).json({message: 'shopping list deleted'});
            }

            return res.status(400).json({message: 'there is no list to be removed for this user'});

        } catch (err) {
            console.log(err);
            return res.status(500).json('app unable to delete due to an error');
        }
    }

    async updateList(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }

            const categoryUpdate = {};

            if (req.body.description) {
                categoryUpdate.description = req.body.description;
            }

            if (req.body.categoryId) {
                const isInvalid = !ObjectId.isValid(req.body.categoryId);

                if (isInvalid) {
                    return res.status(400).json({errorMessage: 'categoryId is invalid. It should be a string with 12 bytes or 24 hex characters'})
                }

                const newCategory = await CategoryModel.findOne({_id: req.body.categoryId}) || null;

                if (!newCategory) {
                    return res.status(400).json({errorMessage: 'category to be updated does not exist'});
                }

                categoryUpdate.categoryId = newCategory._id;
            }

            const userId = req.body.userId;
            const listId = req.params.listId;
            const listUpdated = await ShoppingListModel.updateOne({ userId, _id: listId }, categoryUpdate);

            if (listUpdated) {
                return res.status(200).json({message: 'shopping list was updated successfully'});
            }

        } catch (err) {
            console.log(err);
            return res.status(500).json('app unable to update due to an error');
        }
    }

}
