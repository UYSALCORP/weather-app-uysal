const express = require('express');
const router = express.Router();
const { getCurrentWeather, getWeatherForecast } = require('../controllers/weatherController');
const { protect } = require('../middlewares/authMiddleware');

// Mevcut hava durumu bilgisi
router.get('/current', protect, getCurrentWeather);

// 5 günlük hava durumu tahmini
router.get('/forecast', protect, getWeatherForecast);

module.exports = router;
