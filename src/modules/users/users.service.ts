import { User } from './interfaces/user';
import { userRepository } from '../users/users.repository';
import { ERROR_MESSAGES } from '../../errors';
import { UserParameters } from './interfaces/parameters';

class UserService {
  async create(user: User): Promise<User | Error> {
    const existingUser = await userRepository.findByEmail(user.email);
    if (existingUser !== null) {
      throw new Error(ERROR_MESSAGES.ALREADY_CREATED);
    }
    return userRepository.create(user);
  }

  async findById(id: User['_id']): Promise<User | Error> {
    const existingUser = await userRepository.findById(id);
    if (existingUser === null) {
      throw new Error(ERROR_MESSAGES.ID_NOT_EXIST);
    }
    return existingUser;
  }

  async find({ filterBy, filterText, sortBy, direction, limit, skip }: UserParameters): Promise<User[]> {
    return userRepository.findAndSort({ filterBy, filterText, sortBy, direction, limit, skip });
  }

  async update(user: User): Promise<User | Error> {
    const userWithId = await userRepository.findById(user._id);
    if (userWithId === null) {
      throw new Error(ERROR_MESSAGES.ID_NOT_EXIST);
    }
    const userWithEmail = await userRepository.findByEmail(user.email);
    if (userWithEmail === null) {
      throw new Error(ERROR_MESSAGES.ALREADY_CREATED);
    }
    const updatedUser = await userRepository.update(user);
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
