const jwt = require('jsonwebtoken');

module.exports = {
    generateJWT: (userId, userEmail) => {
        const payload = {
            user_id: userId,
            user_email: userEmail,
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRY_DURATION
            });
        return token;
    }
};