import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const tokenHeader = req.header(process.env.TOKEN_HEADER_NAME);
    const token = tokenHeader && tokenHeader.split('')[1];

    if (!token) {
        return res.status(400).send('access denied, token is not present');
    }

    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.body.userId = user.userId;
        next();

    } catch (err) {
        return res.status(500).json({errorMessage: 'Invalid token!'});
    }

}
