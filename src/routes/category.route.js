import express from 'express';
import CategoryController from "../controllers/category.controller";

const router = express.Router();
const controller = new CategoryController();

/**
 * @swagger
 * definitions:
 *      Category:
 *          properties:
 *              _id:
 *                  type: string
 *              description:
 *                  type: string
 */


/**
 * @swagger
 * /api/categories:
 *      get:
 *          tags:
 *              - categories
 *          produces:
 *              - application/json
 *          responses:
 *              200:
 *                  description: returns categories list
 *                  schema:
 *                      $ref: '#/definitions/Category'
 *
 */
router.get('', controller.categoriesList);

export default router;
