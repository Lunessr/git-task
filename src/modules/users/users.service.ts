import { User, UserWithoutId } from './interfaces/user';
import { userRepository } from '../users/users.repository';
import { ERROR_MESSAGES } from '../../errors';
import { UserParameters } from './interfaces/parameters';

class UserService {
  async create(user: UserWithoutId): Promise<User> {
    const existingUser = await userRepository.findByEmail(user.email);
    if (existingUser !== null) {
      throw new Error(ERROR_MESSAGES.ALREADY_CREATED);
    }
    return userRepository.create(user);
  }

  async findById(id: User['_id']): Promise<User> {
    const existingUser = await userRepository.findById(id);
    if (existingUser === null) {
      throw new Error(ERROR_MESSAGES.ID_NOT_EXIST);
    }
    return existingUser;
  }

  async find(parameters: UserParameters): Promise<User[]> {
    const { filterBy, filterText, sortBy = 'name', direction = 'desc', limit = 3, skip = 0 } = parameters;
    return userRepository.findAndSort({ filterBy, filterText, sortBy, direction, limit, skip });
  }

  async update(id, user: User): Promise<User> {
    const userWithId = await userRepository.findById(id);
    if (userWithId === null) {
      throw new Error(ERROR_MESSAGES.ID_NOT_EXIST);
    }
    const userWithEmail = await userRepository.findByEmail(user.email);
    if (userWithEmail === null) {
      throw new Error(ERROR_MESSAGES.ALREADY_CREATED);
    }
    const updatedUser = await userRepository.update(id, user);
    return updatedUser;
  }

  async delete(id: User['_id']): Promise<void> {
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
