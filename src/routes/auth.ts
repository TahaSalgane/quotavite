const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/register', authController.register);
router.get('/login', authController.login);

module.exports = router;
