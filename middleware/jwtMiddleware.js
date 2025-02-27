// jwtMiddleware.js
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config/config.js');


const jwtMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};


module.exports = jwtMiddleware;




