const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController.js'); 

router.get('/', UserController.home);
router.get('/register', UserController.register);
router.post('/register', UserController.createUser)
router.get('/login', UserController.login)
router.post('/login', UserController.handleLogin)


module.exports = router; 