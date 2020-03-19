import tokenInterceptor from '../interceptors/checkToken.interceptor';
import express from 'express';
const router = express.Router();

import ShoppingListItemController from "../controllers/shoppingListItem.controller";
const controller = new ShoppingListItemController();


export default router;