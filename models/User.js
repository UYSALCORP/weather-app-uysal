const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Lütfen isminizi girin'],
    },
    email: {
        type: String,
        required: [true, 'Lütfen e-posta adresinizi girin'],
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Lütfen geçerli bir e-posta adresi girin',
        ],
    },
    password: {
        type: String,
        required: [true, 'Lütfen şifrenizi girin'],
        minlength: 6,
    },
    searchHistory: [
        {
            city: { type: String, required: true },
            date: { type: Date, default: Date.now },
        },
    ],
    favoriteCities: [
        {
            type: String,
        },
    ],
}, {
    timestamps: true,
});

// Şifreyi hash'lemek için mongoose middleware kullanıyoruz
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Şifreyi karşılaştırmak için bir yöntem ekliyoruz
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
