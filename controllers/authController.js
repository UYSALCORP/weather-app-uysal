const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Kullanıcı kaydı
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Kullanıcı bilgilerini kontrol et
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Lütfen tüm alanları doldurun');
    }

    // Kullanıcının zaten mevcut olup olmadığını kontrol et
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('Bu e-posta adresi zaten kullanılıyor');
    }

    // Yeni kullanıcı oluştur
    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Geçersiz kullanıcı verisi');
    }
});

// @desc    Kullanıcı girişi
// @route   POST /api/auth/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Kullanıcı bilgilerini kontrol et
    if (!email || !password) {
        res.status(400);
        throw new Error('Lütfen e-posta ve şifre girin');
    }

    // Kullanıcıyı bul
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Geçersiz e-posta veya şifre');
    }
});

module.exports = {
    registerUser,
    authUser,
};
