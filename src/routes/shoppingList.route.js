import express from 'express';
import objectIdValidator from '../validators/objectId.validator';
import tokenInterceptor from '../interceptors/checkToken.interceptor';
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
 *
 */
router.get('/', tokenInterceptor, objectIdValidator('userId'), controller.getAllLists);

router.get('/:listId', tokenInterceptor, objectIdValidator('userId', 'listId'), controller.getOneList);

router.post('/create', tokenInterceptor, objectIdValidator('userId', 'categoryId'), shoppingListValidator(), controller.createList);

router.put('/update/:listId', tokenInterceptor, objectIdValidator('userId', 'listId'), controller.updateList);

router.delete('/delete/:listId', tokenInterceptor, objectIdValidator('userId', 'listId'), controller.removeList);

export default router;
