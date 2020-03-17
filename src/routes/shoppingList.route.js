import express from 'express';
import tokenInterceptor from '../interceptors/checkToken.interceptor';
import shoppingListValidator from '../validators/shoppingList.validator';

const router = express.Router();

import ShoppingListController from '../controllers/shoppingList.controller';
const controller = new ShoppingListController();

router.post('/create', tokenInterceptor, shoppingListValidator(), controller.create);

router.get('/:usuarioId', tokenInterceptor, controller.list);

router.get('/filter', controller.filter);

router.get('/:id', controller.getOne);

router.put('/:id', controller.update);

router.delete('/:listId', tokenInterceptor, controller.delete);

export default router;
