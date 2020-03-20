import express from 'express';
import tokenInterceptor from '../interceptors/checkToken.interceptor';
import objectIdValidator from '../validators/objectId.validator';
import dateFormatValidator from "../validators/dateFormat.validator";
import pagedSearchValidator from '../validators/pagedSearch.validator';
import itemListFilterValidator from '../validators/itemListFilter.validator';
import itemListCreateValidator from '../validators/itemListCreate.validator';
import itemListUpdateValidator from '../validators/itemListUpdate.validator';
import ShoppingListItemController from "../controllers/shoppingListItem.controller";

const router = express.Router();
const controller = new ShoppingListItemController();

router.post('/add',
            tokenInterceptor,
            objectIdValidator({name: 'userId'}, {name: 'listId'}),
            itemListCreateValidator(),
            controller.insertShoppingListItems);

router.get('/:itemListId',
            tokenInterceptor,
            objectIdValidator({name: 'itemListId'}, {name: 'userId'}),
            controller.getShoppingListItem);

router.get('/filter/:listId',
            tokenInterceptor,
            objectIdValidator({name: 'listId'}, {name: 'userId'}),
            dateFormatValidator({name: 'created', required: false}),
            itemListFilterValidator(),
            controller.getShoppingListItems);

// todo - needs to be refactored
router.get('/paged/:listId',
            tokenInterceptor,
            objectIdValidator({name: 'listId'}, {name: 'userId'}),
            dateFormatValidator({name: 'created', required: false}),
            itemListFilterValidator(),
            pagedSearchValidator(),
            controller.getPagedShoppingListItems);

router.put('/update/:itemListId',
            tokenInterceptor,
            objectIdValidator({name: 'itemListId'}, {name: 'listId', required: false}, {name: 'userId'}),
            itemListUpdateValidator(),
            controller.updateItemList);

router.delete('/delete/:itemListId',
            tokenInterceptor,
            objectIdValidator({name: 'itemListId'}, {name: 'userId'}),
            controller.removeShoppingListItem);

export default router;