const respond = require('./response.js');
const hs = require('http-status-codes');

module.exports = (http, userUseCase, jwtUseCase) => {
    http.post('/register', async (req, res) => {
        const { email, password } = req.body;
        if (!email || email === "") {
            return respond(res, hs.StatusCodes.BAD_REQUEST, "invalid email");
        }
        if (!password || password == "") {
            return respond(res, hs.StatusCodes.BAD_REQUEST, "invalid password");
        }
        if (password.length < 8) {
            return respond(res, hs.StatusCodes.BAD_REQUEST, "password require 8 character or more");
        }
        
        try {
            const user = await userUseCase.registerUser(email, password);
            const token = jwtUseCase.generateJWT(user.id, user.email);
            respond(res, hs.StatusCodes.OK, '', token);
        } catch (error) {
            respond(res, hs.StatusCodes.BAD_REQUEST, error);
        }
    });

    http.post("/login", async (req, res) => {
        const {email, password} = req.body;
        if (!email || email === "") {
            return respond(res, hs.StatusCodes.BAD_REQUEST, "invalid email");
        }
        if (!password || password == "") {
            return respond(res, hs.StatusCodes.BAD_REQUEST, "invalid password");
        }
    
        try {
            const user = await userUseCase.loginUser(email, password);
            const token = jwtUseCase.generateJWT(user.id, user.email);
            respond(res, hs.StatusCodes.OK, '', token);
        } catch (error) {
            respond(res, hs.StatusCodes.BAD_REQUEST, error);
        }
    });
}