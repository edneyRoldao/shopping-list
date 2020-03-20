import DateUtil from "../utils/date.util";
import UserModel from "../models/user.model";
import { validationResult } from "express-validator";
import CategoryModel from '../models/category.model';
import ShoppingListModel from '../models/shoppingList.model';

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
            return res.status(201).json(shoppingListSaved);

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

            const filter = filterBuilder(req);

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

            const userId = req.body.userId;
            const listId = req.params.listId;

            const shoppingList = await ShoppingListModel.findOne({ userId, _id: listId });

            if (!shoppingList) {
                return res.status(400).json({errorMessage: 'shopping-list to be updated does not exist'});
            }

            const shoppingListUpdate = {};

            if (req.body.description) {
                shoppingListUpdate.description = req.body.description;
            }

            if (req.body.categoryId) {
                const newCategory = await CategoryModel.findOne({_id: req.body.categoryId}) || null;

                if (!newCategory) {
                    return res.status(400).json({errorMessage: 'category to be updated does not exist'});
                }

                shoppingListUpdate.categoryId = newCategory._id;
            }

            const listUpdated = await ShoppingListModel.updateOne({ userId, _id: listId }, shoppingListUpdate);
            return res.status(200).json({message: 'shopping list was updated successfully', shoppingList: listUpdated});

        } catch (err) {
            console.log(err);
            return res.status(500).json('app unable to update shopping-list due to an error');
        }
    }

}

const filterBuilder =  (req) => {
    const filter = {
        userId: req.body.userId
    };

    if (req.query.description) {
        filter.description = { $regex: `.*${req.query.description}.*` };
    }

    if (req.query.categoryId) {
        filter.categoryId = req.query.categoryId;
    }

    if (req.query.created) {
        const dateUtil = new DateUtil();
        const startDate = dateUtil.getStartDayOfDate(req.query.created);
        const endDate = dateUtil.getEndDayOfDate(req.query.created);

        filter.created = { $gte: startDate, $lte: endDate };
    }

    return filter;
};
