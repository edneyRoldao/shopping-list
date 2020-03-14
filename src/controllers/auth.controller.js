import UserModel from '../models/user.model';

export default class AuthController {

    async register(req, res) {

        const user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        const savedUser = await user.save();

        if (savedUser) {
            return res.status(201).json(savedUser);
        }

        return res.status(500).json('there was an error');
    }

    login(req, res) {
        res.json('LOGIN');
    }

}
