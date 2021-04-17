const Task = require('../model/Task');

const TaskController = {
    async getAllTasks(req, res) {
        try {
            const allTasks = await Task.find({ userId: req.id });
            return res.send(allTasks);
        } catch (err) {
            return res.status(400).send({ error : 'Erro ao encontrar tarefas'});
        }
    },

    async getAllTasksByPriority(req, res) {
        try {
            const tasksByPriority = await Task.find({ userId: req.id }).sort({ highPriority: -1, name: 1});
            return res.send(tasksByPriority)
        } catch (err) {
            return res.status(400).send({ error:'Erro ao encontrar tarefas'});
        }
    },

    async addTask(req, res) {
        const { name, content } = req.body;

        if (!name || !content) return res.status(400).send({ error: 'Dados insuficientes' });

        try {   
            const newTask = await Task.create(req.body);
            newTask.userId = req.id;

            return res.status(201).send({message: 'Tarefa cadastrada com sucesso!'})
        } catch (err) {
            return res.status(500).send({ error: 'Erro ao criar tarefa'});
        }
    },

    async updateTask(req, res) {
        try {
            const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.send(updatedTask);
        } catch (err) {
            return res.status(500).send({ error: 'Erro ao atualizar tarefa!'});
        }
    },

    async removeTask(req, res) {
        try {
            await Task.findByIdAndRemove(req.params.id);
            return res.send({ message: 'Tarefa deletada'});
        } catch (err) {
            return res.status(400).send({ error: "Erro ao encontrar tarefa!"});
        }
    }

}

module.exports = TaskController;