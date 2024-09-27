const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/authController');

// Kayıt rotası
router.post('/register', registerUser);

// Giriş rotası
router.post('/login', authUser);

module.exports = router;
