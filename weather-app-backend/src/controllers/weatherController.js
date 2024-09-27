const asyncHandler = require('express-async-handler');
const axios = require('axios');
const logger = require('../middlewares/logger');

// @desc    Mevcut hava durumu bilgilerini al
// @route   GET /api/weather/current?city=Istanbul
// @access  Private
const getCurrentWeather = asyncHandler(async (req, res) => {
    const { city } = req.query;
console.log(city);

    if (!city) {
        res.status(400);
        throw new Error('Şehir adı gereklidir.');
    }

    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        console.log(apiKey);
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=tr`).then((e)=>e.json()).then((e)=>{
            res.json(e);
        })
        // const user = req.user;
        // if (user) {
            
        //     user.searchHistory.push({ city, date: new Date() });
        //     user.save();
        // }
        // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
      
            
      
        // Kullanıcıya özel gösterim için isteği kaydedebilirsiniz (isteğe bağlı)
        // Örneğin, kullanıcı arama geçmişine eklemek

       
    } catch (error) {
        logger.error(`Hava durumu alım hatası: ${error.message}`);
        if (error.response && error.response.status === 404) {
            res.status(404);
            throw new Error('Şehir bulunamadı.');
        } else {
            res.status(500);
                        
            throw new Error('Hava durumu verisi alınırken bir hata oluştu.');
        }
    }
});

// @desc    5 günlük hava durumu tahminini al
// @route   GET /api/weather/forecast?city=Istanbul
// @access  Private
const getWeatherForecast = asyncHandler(async (req, res) => {
    const { city } = req.query;

    if (!city) {
        res.status(400);
        throw new Error('Şehir adı gereklidir.');
    }

    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=tr`).then((e)=>e.json()).then((e)=>{
            res.json(e);
        })
     

     
    } catch (error) {
        logger.error(`Hava durumu tahmini alım hatası: ${error.message}`);
        if (error.response && error.response.status === 404) {
            res.status(404);
            throw new Error('Şehir bulunamadı.');
        } else {
            res.status(500);
            throw new Error('Hava durumu tahmini alınırken bir hata oluştu.');
        }
    }
});

module.exports = {
    getCurrentWeather,
    getWeatherForecast,
};
