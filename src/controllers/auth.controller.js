import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';
import { validationResult } from "express-validator";


export default class AuthController {

    async register(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        // verificar se o email já existe
        const emailExist = await UserModel.findOne({email: req.body.email});

        if (emailExist) {
            return res.status(400).json({errorMessage: 'email exists'});
        }

        try {
            // encriptando a senha
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const user = new UserModel({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });

            const savedUser = await user.save();

            return res.status(201).json({userId: savedUser._id});

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

        // verificando se o usuario existe
        const user = await UserModel.findOne({email: req.body.email});

        if (!user) {
            return res.status(400).json({errorMessage: 'email or password invalid!'});
        }

        // verificar se a senha esta correta
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({errorMessage: 'email or password invalid!'});
        }

        const payload = {username: user.name, permissions: ['all']};

        const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET);

        res.header(process.env.TOKEN_HEADER_NAME, accessToken);

        return res.status(200).json('success');
    }

}
