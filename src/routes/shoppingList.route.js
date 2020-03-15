import tokenInterceptor from '../interceptors/checkToken.interceptor';
import express from 'express';
const router = express.Router();

import ShoppingListController from '../controllers/shoppingList.controller';
const controller = new ShoppingListController();

router.get('/list', tokenInterceptor, controller.list);

export default router;