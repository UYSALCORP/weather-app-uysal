const express = require('express');
const router = express.Router();
const { registerUser, authUser,getMe } = require('../controllers/authController');
// const protect  = require('../middleware/authMiddleware');
// Kayıt rotası
router.post('/register', registerUser);

// Giriş rotası
router.post('/login', authUser);

// Auth me
 router.get('/me',getMe)

module.exports = router;
