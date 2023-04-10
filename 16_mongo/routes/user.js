const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.post('/', userController.postUser);

router.get('/:userId', userController.getUserById);

module.exports = router;