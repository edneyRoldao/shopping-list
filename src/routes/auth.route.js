import express from 'express';
const router = express.Router();

import AuthController from '../controllers/auth.controller';
const controller = new AuthController();

router.post('/register', controller.register);

router.post('/login', controller.login);

export default router;
