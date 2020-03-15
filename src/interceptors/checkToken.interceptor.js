import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    const token = req.header(process.env.TOKEN_HEADER_NAME);

    if (!token) {
        return res.status(400).send('access denied, token is not present');
    }

    try {
        jwt.verify(token, process.env.TOKEN_SECRET);
        next();

    } catch (err) {
        return res.status(500).json({errorMessage: 'Invalid token!'});
    }
}
