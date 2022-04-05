import { User } from './interfaces/user';

import { userRepository } from '../users/users.repository';
import { ERROR_MESSAGES } from '../../errors';

class UserService {
  async create(email: User['email'], User: User): Promise<User | Error> {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser !== null) {
      throw new Error(ERROR_MESSAGES.ALREADY_CREATED);
    }
    return userRepository.create(User);
  }

  async findById(id: User['_id']): Promise<User | Error> {
    const existingUser = await userRepository.findById(id);
    if (existingUser === null) {
      throw new Error(ERROR_MESSAGES.ID_NOT_EXIST);
    }
    return existingUser;
  }

  async find(): Promise<User[]> {
    return userRepository.find();
  }

  async update(id: User['_id'], email: User['email'], User: User): Promise<User | Error> {
    const userWithId = await userRepository.findById(id);
    if (userWithId === null) {
      throw new Error(ERROR_MESSAGES.ID_NOT_EXIST);
    }
    const userWithEmail = await userRepository.findByEmail(email);
    if (userWithEmail === null) {
      throw new Error(ERROR_MESSAGES.ALREADY_CREATED);
    }
    const updatedUser = await userRepository.update(id, User);
    return updatedUser;
  }

  async delete(id: User['_id']): Promise<void | Error> {
    const existingUser = await userRepository.findById(id);
    if (existingUser === null) {
      throw new Error(ERROR_MESSAGES.ID_NOT_EXIST);
    }
    const deleted = await userRepository.delete(id);
    return deleted;
  }
}

const userService = new UserService();
export { userService };
