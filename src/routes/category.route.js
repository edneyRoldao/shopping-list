import tokenInterceptor from '../interceptors/checkToken.interceptor';
import express from 'express';
const router = express.Router();

import CategoryController from "../controllers/category.controller";
const controller = new CategoryController();

router.get('/', controller.list);

export default router;
