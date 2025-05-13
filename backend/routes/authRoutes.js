const express = require('express');
const authController = require('../controllers/authController')
const { registerLoginLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/register', registerLoginLimiter, authController.createUser);
router.post('/login', registerLoginLimiter, authController.login);
router.post('/logout', authController.logout);
router.post('/refresh-token', registerLoginLimiter, authController.refreshToken);

module.exports = router;