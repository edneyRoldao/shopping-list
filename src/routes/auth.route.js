import express from 'express';
import userValidator from '../validators/user.validator';
import loginValidator from '../validators/userLogin.validator';
import activationAccountValidator from '../validators/activationAccount.validator';

const router = express.Router();

import AuthController from '../controllers/auth.controller';
const controller = new AuthController();

router.post('/register', userValidator(), controller.register);

router.post('/login', loginValidator(), controller.login);

router.post('/activation', activationAccountValidator('requestActivation'), controller.sendCodeActivation);

router.post('/activate', activationAccountValidator(), controller.activateAccount);

router.post('/disable', loginValidator(), controller.disableAccount);

export default router;
