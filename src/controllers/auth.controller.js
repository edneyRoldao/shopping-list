import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import DateUtil from "../utils/date.util";
import UserModel from '../models/user.model';
import { validationResult } from "express-validator";
import RefreshTokenModel from '../models/refreshToken.model';
import ActivationCodeModel from '../models/activationCode.model';
import CodeActivationService from "../services/codeActivation.service";

export default class AuthController {

    async register(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        const emailExist = await UserModel.findOne({email: req.body.email});

        if (emailExist) {
            return res.status(400).json({errorMessage: 'email exists'});
        }

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const user = new UserModel({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });

            const savedUser = await user.save();

            const codeActivationService = new CodeActivationService();
            const codeActivationSent = codeActivationService.sendActivationCode(savedUser.email);
            const mailMsg = codeActivationSent ? 'code activation has been sent to email' : 'there was an error while try to send code activation via email. go to /auth/activation';

            return res.status(201).json({userId: savedUser._id, message: mailMsg});

        } catch (err) {
            console.log(err);
            return res.status(500).json('there was an unexpected error!');
        }

    }

    async login(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        const user = await UserModel.findOne({email: req.body.email});

        if (!user) {
            return res.status(400).json({errorMessage: 'email or password invalid!'});
        }

        if (!user.active) {
            return res.status(401).json({errorMessage: 'User account is not activated'});
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({errorMessage: 'email or password invalid!'});
        }

        const payload = { userId: user._id, userName: user.name, userEmail: user.email };

        const accessToken = generateAccessToken(payload);
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

        const refreshTokenModel = new RefreshTokenModel({ refreshToken });
        const refreshTokenSaved = await refreshTokenModel.save();

        return res.status(200).json({ accessToken, refreshToken: refreshTokenSaved.refreshToken, tokenType: 'Bearer' });
    }

    async logout(req, res) {
        const refreshToken = req.body.refreshToken;

        if (!refreshToken) {
            return res.status(400).json({errorMessage: 'refreshToken field inside body is required'});
        }

        const tokenDeleted = await RefreshTokenModel.findOneAndRemove({refreshToken}).exec();

        if (tokenDeleted) {
            return res.status(200).json({message: 'refresh token deleted deleted!'});
        }

        return res.status(400).json({message: 'there is no token to be removed!'});
    }

    async sendCodeActivation(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }

            const email = req.body.email;
            const user = await UserModel.findOne(email);

            if (user && user.active) {
                return res.status(400).json({ errorMessage: 'User already activated' });
            }

            const codeActivationService = new CodeActivationService();
            const codeActivationSent = codeActivationService.sendActivationCode();
            const mailMsg = codeActivationSent ? 'code activation has been sent to email' : 'there was an unexpected error while try to send code activation. try again later';

            return res.status(201).json({ message: mailMsg });

        } catch (err) {
            console.log(err);
            return res.status(500).json('there was an unexpected error while try to send code activation. try again later');
        }
    }

    async activateAccount(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }

            const email = req.body.email;
            const code = req.body.activationCode;

            const user = await UserModel.findOne({email});

            if (!user) {
                return res.status(400).json({ errorMessage: 'Email does not exist in owr database' });
            }

            if (user.active) {
                return res.status(400).json({ errorMessage: 'User already activated' });
            }

            const activation = ActivationCodeModel.findOne({ email, code });

            if (!activation) {
                return res.status(400).json({ errorMessage: 'activation code does not match' });
            }

            const dateUtil = new DateUtil();

            if (!dateUtil.isCodeActivationDateValid(activation.generated)) {
                return res.status(400).json({ errorMessage: 'activation code is expired. Please Generate another code' });
            }

            UserModel.updateOne({_id: user._id}, { active: true });
            return res.status(201).json({ errorMessage: 'User has been activated' });

        } catch (err) {
            console.log(err);
            return res.status(500).json('there was an unexpected error while try to activate account. try again later');
        }

    }

    async getRefreshToken(req, res) {
        const refreshToken = req.body.refreshToken;

        if (!refreshToken) {
            return res.status(400).json({errorMessage: 'refreshToken field inside body is required'});
        }

        const contains = await RefreshTokenModel.countDocuments({refreshToken});

        if (!contains) {
            return res.status(403).json({errorMessage: 'refresh token does not exist'});
        }

        try {
            const user = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const accessToken = generateAccessToken(user);
            return res.status(200).json({accessToken});

        } catch (err) {
            return res.status(403).json({ errorMessage: 'refresh token is not valid' });
        }

    }

    async disableAccount(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }

            const user = await UserModel.findOne({email: req.body.email});

            if (!user) {
                return res.status(400).json({errorMessage: 'email or password invalid!'});
            }

            if (!user.active) {
                return res.status(401).json({errorMessage: 'User account already disabled'});
            }

            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

            if (!isPasswordValid) {
                return res.status(400).json({errorMessage: 'email or password invalid!'});
            }

            user.active = false;
            UserModel.updateOne({_id: user._id}, { active: false });
            return res.status(201).json({ errorMessage: 'User has been disabled' });

        } catch (err) {
            console.log(err);
            return res.status(500).json('there was an unexpected error while try to disable account. try again later');
        }

    }

}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1800s'});
}