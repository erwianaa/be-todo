const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized, no token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'failed to authenticate token.' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = jwtMiddleware;