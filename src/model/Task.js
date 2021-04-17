const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
    {
        userId: {
            type: String
        },
        name: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        highPriority: {
            type: Boolean,
            default: false
        }
    }
);

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;