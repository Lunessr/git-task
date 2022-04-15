import * as express from 'express';
import * as bodyParser from 'body-parser';
import { userService } from './users.service';
import { errors } from '../../errors';
import { UserParameters } from './interfaces/parameters';

const router = express.Router();
const jsonParser = bodyParser.json();

const handleError = (res, error) => {
  const err = errors.get(error.message);
  if (err) {
    res.status(err.status).send(err.message);
  } else {
    res.status(500).send(error.message);
  }
};

const addUser = async (req, res) => {
  const { name, surname, age, email, tel, role } = req.body;
  try {
    const createdUser = await userService.create({ name, surname, age, email, tel, role });
    res.status(201).send(createdUser);
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

const getUsers = async (req: express.Request, res): Promise<void> => {
  const { filterBy, filterText, sortBy, direction, limit, skip } = req.query;

  try {
    const users = await userService.find({
      filterBy,
      filterText,
      sortBy,
      direction,
      limit: Number(limit),
      skip: Number(skip),
    } as UserParameters);
    res.status(200).send(users);
  } catch (error) {
    handleError(res, error);
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.update(req.params.id, req.body);
    res.status(200).json(updatedUser);
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

export { router };
