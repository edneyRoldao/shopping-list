import express from 'express';
import tokenInterceptor from '../interceptors/checkToken.interceptor';
import shoppingListValidator from '../validators/shoppingList.validator';
import objectIdValidator from '../validators/objectId.validator';

const router = express.Router();

import ShoppingListController from '../controllers/shoppingList.controller';
const controller = new ShoppingListController();

router.post('/create', tokenInterceptor, shoppingListValidator(), controller.createShoppingList);

router.get('/:userId', tokenInterceptor, objectIdValidator('userId'), controller.getLists);










router.get('/filter', controller.filter);

router.get('/:id', controller.getOne);

router.put('/:id', controller.update);

router.delete('/:listId', tokenInterceptor, controller.delete);

export default router;
