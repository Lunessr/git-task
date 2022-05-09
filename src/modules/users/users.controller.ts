import * as express from 'express';
import { userService } from './users.service';
import { handleError } from '../../errors';
import { UserParameters } from './interfaces/parameters';
import { userDocToUserWithoutPass } from '../../mappers/user.mapper';

const router = express.Router();

const addUser = async (req, res) => {
  const { name, surname, age, email, tel, role, password } = req.body;
  try {
    const createdUser = await userService.create({ name, surname, age, email, tel, role, password });
    res.status(201).send(userDocToUserWithoutPass(createdUser));
  } catch (error) {
    handleError(res, error);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userService.findById(req.params.id);
    res.status(200).json(userDocToUserWithoutPass(user));
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
    res.status(200).send(users.map(userDocToUserWithoutPass));
  } catch (error) {
    handleError(res, error);
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.update(req.params.id, req.body);
    res.status(200).json(userDocToUserWithoutPass(updatedUser));
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

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userToken = await userService.login(email, password);
    res.send(userToken);
  } catch (error) {
    handleError(res, error);
  }
};

router.post('/users', addUser);
router.get('/users/:id', getUser);
router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/login', loginUser);

export { router };
