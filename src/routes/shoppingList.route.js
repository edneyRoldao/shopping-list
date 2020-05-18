import express from 'express';
import tokenInterceptor from '../interceptors/checkToken.interceptor';
import objectIdValidator from '../validators/objectId.validator';
import dateFormatValidator from '../validators/dateFormat.validator';
import shoppingListValidator from '../validators/shoppingList.validator';

const router = express.Router();

import ShoppingListController from '../controllers/shoppingList.controller';
const controller = new ShoppingListController();

/**
 * Note:
 *  - All request must have a Authentication header and its value is a JWT
 *  - userId is retrieved from JWT and will be attached to request body via tokenInterceptor
 */

/**
 * this resource supports filter as queryParams
 * FIELDS: description, categoryId, created
 * by default required is true
 *
 */
router.get('/',
            tokenInterceptor,
            objectIdValidator({name: 'userId'}, {name: 'categoryId', required: false}),
            dateFormatValidator({name: 'created', required: false}),
            controller.getAllLists);

router.get('/:listId',
            tokenInterceptor,
            objectIdValidator({name: 'userId'}, {name: 'listId'}),
            controller.getOneList);

router.post('/create',
            tokenInterceptor,
            objectIdValidator({name: 'userId'}, {name: 'categoryId'}),
            shoppingListValidator(),
            controller.createList);

router.put('/update/:listId',
            tokenInterceptor,
            objectIdValidator({name: 'userId'}, {name: 'listId'}, {name: 'categoryId', required: false}),
            controller.updateList);

router.delete('/delete/:listId',
              tokenInterceptor,
              objectIdValidator({name: 'userId'}, {name: 'listId'}),
              controller.removeList);

export default router;
