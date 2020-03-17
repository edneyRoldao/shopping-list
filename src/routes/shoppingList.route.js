import express from 'express';
import objectIdValidator from '../validators/objectId.validator';
import tokenInterceptor from '../interceptors/checkToken.interceptor';
import shoppingListValidator from '../validators/shoppingList.validator';

const router = express.Router();

import ShoppingListController from '../controllers/shoppingList.controller';
const controller = new ShoppingListController();

router.post('/create/:userId', tokenInterceptor, shoppingListValidator(), controller.createList);

router.get('/:userId', tokenInterceptor, objectIdValidator('userId'), controller.list);

router.get('/:userId/filter', objectIdValidator('userId'), controller.filter);

router.get('/:userId/item/:listId', objectIdValidator('userId'), objectIdValidator('listId'), controller.getOne);

router.put('/:userId/update/:listId', objectIdValidator('userId'), objectIdValidator('listId'), controller.update);

router.delete('/:userId/delete/:listId', tokenInterceptor, objectIdValidator('userId'), objectIdValidator('listId'), controller.delete);

export default router;
