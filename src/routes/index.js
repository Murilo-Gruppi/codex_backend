const router = require('express').Router();
const TaskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

router.get('/', auth,  TaskController.getAllTasks);
router.get('/tasks-by-priority', auth, TaskController.getAllTasksByPriority);
router.post('/add', auth, TaskController.addTask);
router.put('/update/:id', auth, TaskController.updateTask);
router.delete('/remove/:id', auth, TaskController.removeTask);

module.exports = router;