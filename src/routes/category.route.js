import express from 'express';
import CategoryController from "../controllers/category.controller";
import tokenInterceptor from '../interceptors/checkToken.interceptor';

const router = express.Router();
const controller = new CategoryController();

router.get('/', tokenInterceptor, controller.list);

export default router;
