const express = require('express');
const res = require('express/lib/response');
const mongoose = require('mongoose');
require('dotenv').config();
const router = require('./modules/users/users.controller');

const server = express();

mongoose
  .connect(process.env.MONGO_URL, {
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

server.use(router);

server.use((req, res) => {
  const title = 'Error Page';
  res.status(404).send('error');
});
