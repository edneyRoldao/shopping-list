import tokenInterceptor from '../interceptors/checkToken.interceptor';
import express from 'express';
const router = express.Router();

import CategoryController from "../controllers/category.controller";
const controller = new CategoryController();

router.get('', tokenInterceptor, controller.getCategories);

export default router;
