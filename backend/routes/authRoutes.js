const express = require('express');
const authController = require('../controllers/authController')

const router = express.Router();

router.post('/register', authController.createUser);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;