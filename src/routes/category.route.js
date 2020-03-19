import express from 'express';
import CategoryController from "../controllers/category.controller";

const router = express.Router();
const controller = new CategoryController();

router.get('', controller.categoriesList);

export default router;
