// Project Files
const todoUseCase = require('./usecase/todo.js');
const userUseCase = require('./usecase/user.js');
const jwtUseCase = require('./usecase/jwt.js');
const todoHTTPInit = require('./presenter/todo.js');
const authHTTPInit = require('./presenter/auth.js');
const dbConfig = require('./models/index.js');


// Libs
const express = require('express');

function init() {
    // apps
    require('dotenv').config();
    const app = express();
    app.use(express.json());

    // init usecase
    const todoUC = todoUseCase(dbConfig.todo);
    const userUC = userUseCase(dbConfig.user);

    todoHTTPInit(app, todoUC);
    authHTTPInit(app, userUC, jwtUseCase);

    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    });
}


// run init
init();

