const router = require('express').Router();
const UserController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/', auth, UserController.getUser);
router.post('/create', UserController.createUser);
router.post('/login', UserController.userLogin);

module.exports = router;