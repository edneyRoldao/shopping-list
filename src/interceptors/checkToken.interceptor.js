import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = req.header(process.env.TOKEN_HEADER_NAME);

    if (!token) {
        return res.status(400).send('access denied, token is not present');
    }

    try {
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        req.body.userId = user.userId;
        next();

    } catch (err) {
        return res.status(500).json({errorMessage: 'Invalid token!'});
    }

}
