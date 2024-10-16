const respond = require('./response.js');
const hs = require('http-status-codes');
const jwt = require('./../middleware/jwt.js');

module.exports = (http, todoUseCase) => {
    http.get('/todos', jwt, async (req, res) => {
        const currentUser = req.user;
        const todos = await todoUseCase.getTodos(currentUser);
        respond(res, hs.StatusCodes.OK, '', todos);
    });

    http.post('/todos', jwt, async (req, res) => {
        const currentUser = req.user;
        const reqBody = req.body;
        if (!reqBody) {
            return respond(res, hs.StatusCodes.BAD_REQUEST, 'invalid request payload');
        }

        if (!reqBody.name || reqBody.name.length == "") {
            return respond(res, hs.StatusCodes.BAD_REQUEST, 'invalid name value');
        }

        try {
            const todo = await todoUseCase.createTodo(reqBody.name, reqBody.isDone, currentUser);
            respond(res, hs.StatusCodes.CREATED, '', todo);
        } catch (error) {
            respond(res, hs.StatusCodes.BAD_REQUEST, error);
        }
    })

    http.get('/todos/:id', jwt, async (req, res) => {
        const currentUser = req.user;
        const id = req.params.id;
        if (!id) {
            return respond(res, hs.StatusCodes.BAD_REQUEST, 'Invalid ID');
        }

        try {
            const todo = await todoUseCase.getTodo(id, currentUser);
            respond(res, hs.StatusCodes.OK, '', todo);
        } catch (error) {
            respond(res, hs.StatusCodes.NOT_FOUND, error);
        }
    });

    http.put('/todos/:id', jwt, async (req, res) => {
        const currentUser = req.user;
        const id = req.params.id;
        if (!id) {
            respond(res, hs.StatusCodes.BAD_REQUEST, 'Invalid ID');
            return;
        }
        
        // validate request body
        const reqBody = req.body;
        if (!reqBody.name) {
            return respond(res, hs.StatusCodes.BAD_REQUEST, 'invalid name value')
        }

        try {
            const todo = await todoUseCase.updateTodo(id, reqBody.name, reqBody.isDone, currentUser);
            respond(res, hs.StatusCodes.OK, '', todo);
        } catch (error) {
            respond(res, hs.StatusCodes.NOT_FOUND, error);
        }
    })

    http.delete('/todos/:id', jwt, async (req, res) => {
        const currentUser = req.user;
        const id = req.params.id;
        if (!id) {
            return respond(res, hs.StatusCodes.BAD_REQUEST, 'Invalid ID');
        }

        try {
            const todo = await todoUseCase.deleteTodo(id, currentUser);
            respond(res, hs.StatusCodes.OK, '');
        } catch (error) {
            respond(res, hs.StatusCodes.NOT_FOUND, error);
        }
    })
}