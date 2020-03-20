import { validationResult } from "express-validator";
import ShoppingListModel from '../models/shoppingList.model';
import ItemListModel from '../models/itemList.model';
import DateUtil from "../utils/date.util";
import PagedSearchUtil from "../utils/pagedSearch.util";

export default class ItemListController {

    async insertItemList(req, res)  {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }

            const list = await ShoppingListModel.findOne({ _id: req.body.listId, userId: req.body.userId  });

            if (!list) {
                return res.status(400).json({errorMessage: 'shopping list or user does not exist!'});
            }

            delete req.body.userId;
            const itemList = new ItemListModel(req.body);
            const itemListSaved = await itemList.save();
            return res.status(201).json(itemListSaved);

        } catch (err) {
            console.log(err);
            return res.status(500).json('there was an unexpected error when try to create a shopping list item!');
        }
    }

    async getItemList(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }

            const itemList = await ItemListModel.findOne({ _id: req.params.itemListId });
            return res.status(200).json(itemList || {});

        } catch (err) {
            console.log(err);
            return res.status(500).json('there was an unexpected error when try to get an item list!');
        }
    }

    async getItemsList(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }

            const filter = filterBuilder(req);

            const itemsList = await ItemListModel.find(filter);
            return res.status(200).json(itemsList || []);

        } catch (err) {
            console.log(err);
            return res.status(500).json('there was an unexpected error when try to filter list items!');
        }
    }

    async getPagedItemsList(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }

            let pageSize = 10;
            let pageNumber = 1;

            if (req.query.pageSize) {
                pageSize = parseInt(req.query.pageSize);
            }

            if (req.query.pageNumber) {
                pageNumber = parseInt(req.query.pageNumber);
            }

            const filter = filterBuilder(req);
            const total = ItemListModel.countDocuments(filter);

            const initIndex = (pageNumber - 1) * pageSize;

            if (total < initIndex) {

            }

            const itemsList = await ItemListModel
                .find(filter)
                .limit(pageSize)
                .skip(initIndex)
                .exec();

            const pagedSearchUtil = new PagedSearchUtil();
            const pagedResult = pagedSearchUtil.getPagedObject(pageSize, pageNumber, total, itemsList);
            return res.status(200).json(pagedResult);

        } catch (err) {
            console.log(err);
            return res.status(500).json('there was an unexpected error when try to paged list items!');
        }
    }

    async updateItemList(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }

            const itemList = await ItemListModel.findOne({ _id: req.params.itemListId });

            if (!itemList) {
                return res.status(400).json({errorMessage: 'item list to be updated does not exist'});
            }

            const itemListUpdate = itemListUpdateBuilder(req);

            if (req.body.listId) {
                const newShoppingList = await ShoppingListModel.findOne({ _id: req.body.listId, userId: req.body.userId  });

                if (!newShoppingList) {
                    return res.status(400).json({errorMessage: 'shoppingList to be updated neither exists nor is not owned by the user'});
                }

                itemListUpdate.listId = newShoppingList._id;
            }

            const itemListUpdated = await ItemListModel.updateOne({ _id: req.params.itemListId }, itemListUpdate);
            return res.status(200).json({message: 'item list was updated successfully', itemList: itemListUpdated});

        } catch (err) {
            console.log(err);
            return res.status(500).json('app unable to update item list due to an error');
        }
    }

    async removeItemList(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }

            const itemListDeleted = await ItemListModel
                .findOneAndRemove({_id: req.params.itemListId})
                .exec();

            if (itemListDeleted) {
                return res.status(200).json({message: 'item list deleted!'});
            }

            return res.status(400).json({message: 'there is no item list to be removed!'});

        } catch (err) {
            console.log(err);
            return res.status(500).json('there was an unexpected error when try to remove an item list!');
        }
    }

}

const filterBuilder  = (req) => {
    const filter = {
        listId: req.params.listId
    };

    if (req.query.amount) {
        filter.amount = req.query.amount
    }

    if (req.query.description) {
        filter.description = { $regex: `.*${req.query.description}.*` };
    }

    if (req.query.purchased) {
        filter.purchased = req.query.purchased
    }

    if (req.query.price) {
        filter.price = req.query.price
    }

    if (req.query.url) {
        filter.url = { $regex: `.*${req.query.url}.*` };
    }

    if (req.query.created) {
        const dateUtil = new DateUtil();
        const startDate = dateUtil.getStartDayOfDate(req.query.created);
        const endDate = dateUtil.getEndDayOfDate(req.query.created);

        filter.created = { $gte: startDate, $lte: endDate };
    }

    return filter;
};

const itemListUpdateBuilder = (req) => {
    const itemListUpdate = {};

    if (req.body.amount) {
        itemListUpdate.amount = req.body.amount;
    }

    if (req.body.description) {
        itemListUpdate.description = req.body.description;
    }

    if (req.body.purchased) {
        itemListUpdate.purchased = req.body.purchased;
    }

    if (req.body.price) {
        itemListUpdate.price = req.body.price;
    }

    if (req.body.url) {
        itemListUpdate.url = req.body.url;
    }

    return itemListUpdate;
};
