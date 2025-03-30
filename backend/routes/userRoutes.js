const express = require('express');
const userController = require('../controllers/userController')

const router = express.Router();

router.get("/profile", protect);
router.post("/profile", protect);
router.delete("/profile", protect);

// router.post('/register', userController.createUser);
// router.post('/login', userController.login);
// router.post('/logout', userController.logout);

module.exports = router;