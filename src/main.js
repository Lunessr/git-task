const express = require('express');
const res = require('express/lib/response');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const server = express();
const Schema = mongoose.Schema;

mongoose
    .connect('mongodb+srv://Vadim:V19021996V@cluster0.e95ae.mongodb.net/users-goods-api?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('Connected to mongoDB'))
    .catch((error) => console.log(error));

server.listen(3000, (error) => {
    error ? console.log(error) : console.log('Server started');
});

server.get('/', (req, res) => {
    const title = 'Home page';
    res.send('<h1>Home page</h1>');
});

const jsonParser = bodyParser.json();

const handleError = (res, error) => {
    res.status(500).send(error.message);
};

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
    admin: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

const addUser = (req, res) => {
    const { name, age, email, tel, admin } = req.body;
    const user = new User({ name, age, email, tel, admin});
    if ({ email } == User.find(req.body.email)) {
        res.status(400).send(error);
    } else {
        user
            .save()
            .then((user) => res.status(201).json(user))
            .catch((error) => handleError(res, error));
    };
};

const getUser = (req, res) => {
    User
        .findById(req.params.id)
        .then((user) => res.status(200).json(user))
        .catch((error) => handleError(res, error));
};

const getUsers = (req, res) => {
    User
        .find()
        .sort({ createdAt: -1 })
        .then((users) => res.status(200).json(users))
        .catch((error) => handleError(res, error));
};

const updateUser = (req, res) => {
    const { name, age, email, tel, admin} = req.body;
    const { id } = req.params;
    if ( { id } != User.findById(req.params.id)) {
        res.status(404).send(error);
    } else {
    User
        .findByIdAndUpdate(id, { name, age, email, tel, admin}, { new: true })
        .then((user) => res.status(200).json(user))
        .catch((error) => handleError(res, error));
    };
};

const deleteUser = (req, res) => {
    if ( { id } != User.findById(req.params.id)) {
        res.status(404).send(error);
    } else {
    User
        .findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json(req.params.id))
        .catch((error) => handleError(res, error));
    };
};

server.post('/users', jsonParser, addUser);
server.get('/users/:id', getUser);
server.get('/users', getUsers);
server.put('/users/:id', jsonParser, updateUser);
server.delete('/users/:id', deleteUser);

server.use((req, res) => {
    const title = 'Error Page';
    res
      .status(404)
      .send('error');
});