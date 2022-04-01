
// контроллер: доступ до експреса, валідація, отправка даних, роутінг
// юзер сервіс: доступ до репозиторія юзера, класс
// юзер репозеторій: доступ до монго, класс


const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    tel: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
