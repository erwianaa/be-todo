module.exports = (todoModel) => {
    async function getTodos(currentUser) {
        const todos = await todoModel.findAll({
            where: {user_id: currentUser.user_id},
        });
    
        return todos;
    }

    async function getTodo(id, currentUser) {
        const todo = await todoModel.findOne({
            where: {id: id, user_id: currentUser.user_id}
        });
    
        if (!todo) {
            throw "Todo Not Found";
        }

        return todo;
    }

    async function createTodo(name, isDone, currentUser) {
        const todo = await todoModel.create({
            name: name,
            isDone: isDone,
            user_id: currentUser.user_id
        });

        return todo;
    }

    async function updateTodo(id, name, isDone, currentUser) {
        const todo = await todoModel.findOne({
            where: {id: id, user_id: currentUser.user_id}
        });
        if (!todo) {
            throw "Todo Not Found";
        }

        todo.isDone = isDone;
        todo.name = name;
        await todo.save();
        
        return todo;
    }

    async function deleteTodo(id, currentUser) {
        const todo = await todoModel.findOne({
            where: {id: id, user_id: currentUser.user_id}
        });
        if (!todo) {
            throw "Todo Not Found";
        }

        await todo.destroy();
    }

    return {
        getTodos,
        getTodo,
        createTodo,
        updateTodo,
        deleteTodo
    };
}