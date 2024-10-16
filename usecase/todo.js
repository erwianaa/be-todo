module.exports = (todoModel) => {
    async function getTodos() {
        const todos = await todoModel.findAll();
        return todos;
    }

    async function getTodo(id) {
        const todo = await todoModel.findByPk(id);
        if (!todo) {
            throw "Todo Not Found";
        }

        return todo;
    }

    async function createTodo(name, isDone) {
        const todo = await todoModel.create({
            name: name,
            isDone: isDone,
        });

        return todo;
    }

    async function updateTodo(id, name, isDone) {
        const todo = await todoModel.findByPk(id);
        if (!todo) {
            throw "Todo Not Found";
        }

        todo.isDone = isDone;
        todo.name = name;
        await todo.save();
        
        return todo;
    }

    async function deleteTodo(id) {
        const todo = await todoModel.findByPk(id);
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