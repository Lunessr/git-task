const express = require('express');
const bodyParser = require('body-parser');
const userService = require('./users.service');
const { errors } = require('../../errors');

const router = express.Router();
const jsonParser = bodyParser.json();

const handleError = (res, error) => {
  let err = errors.get(error.message);
  if (err) {
    res.status(err.status).send(err.message);
  } else {
    res.status(500).send(error.message);
  }
};

const addUser = async (req, res) => {
  const { name, age, email, tel, role } = req.body;
  try {
    const user = await userService.create({ name, age, email, tel, role });
    res.status(201).send(user);
  } catch (error) {
    handleError(res, error);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userService.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    handleError(res, error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userService.find();
    res.status(200).send(users);
  } catch (error) {
    handleError(res, error);
  }
};

const updateUser = async (req, res) => {
  const { name, age, email, tel, role } = req.body;
  try {
    const user = await userService.update(req.params.id, { name, age, email, tel, role });
    res.status(200).json(user);
  } catch (error) {
    handleError(res, error);
  }
};

const deleteUser = async (req, res) => {
  try {
    await userService.delete(req.params.id);
    res.status(200).json('Current user is deleted');
  } catch (error) {
    handleError(res, error);
  }
};

router.post('/users', jsonParser, addUser);
router.get('/users/:id', getUser);
router.get('/users', getUsers);
router.put('/users/:id', jsonParser, updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
