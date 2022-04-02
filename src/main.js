const express = require('express');
const res = require('express/lib/response');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { addUser, getUser, getUsers, updateUser, deleteUser } = require('./modules/users/users.controller');

const server = express();

mongoose
  .connect('mongodb+srv://Vadim:V19021996V@cluster0.e95ae.mongodb.net/users-goods-api?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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

server.post('/users', jsonParser, addUser);
server.get('/users/:id', getUser);
server.get('/users', getUsers);
server.put('/users/:id', jsonParser, updateUser);
server.delete('/users/:id', deleteUser);

server.use((req, res) => {
  const title = 'Error Page';
  res.status(404).send('error');
});
