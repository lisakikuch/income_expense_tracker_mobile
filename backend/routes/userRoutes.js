const express = require('express');
const userController = require('../controllers/userController')
const protect = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

// Only accessible by admin users
router.get("/", protect, isAdmin, userController.getAllUsers);
router.delete("/:id", protect, isAdmin, userController.deleteUser);

module.exports = router;