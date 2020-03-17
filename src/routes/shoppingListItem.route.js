import tokenInterceptor from '../interceptors/checkToken.interceptor';
import express from 'express';
const router = express.Router();

import ShoppingListItemController from "../controllers/shoppingListItem.controller";
const controller = new ShoppingListItemController();

router.post('/items/add', controller.add);

router.delete('/items/remove', controller.delete);

router.get('/items/:id', controller.getOne);

router.get('/items/', controller.list);

router.get('/items/filter', controller.filter);

export default router;