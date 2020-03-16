import express from 'express';
import userValidator from '../validators/user.validator';
import loginValidator from '../validators/userLogin.validator';

const router = express.Router();

import AuthController from '../controllers/auth.controller';
const controller = new AuthController();

router.post('/register', userValidator(), controller.register);

router.post('/login', loginValidator(), controller.login);

export default router;
