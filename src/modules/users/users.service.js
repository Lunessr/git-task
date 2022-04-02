const userRepository = require('../users/users.repository');
const { ERROR_MESSAGES } = require('../../errors');

class UserService {
  async create({ name, age, email, tel, role }) {
    const existingUser = await userRepository.findByEmail({ email: email });
    if (existingUser.length > 0) {
      throw new Error(ERROR_MESSAGES.ALREADY_CREATED);
    }
    return userRepository.create({ name, age, email, tel, role });
  }

  async findById(id) {
    const existingUser = await userRepository.findById(id);
    if (existingUser === null) {
      throw new Error(ERROR_MESSAGES.ID_NOT_EXIST);
    }
    return existingUser;
  }

  async find() {
    return userRepository.find();
  }

  async update(id, { name, age, email, tel, role }) {
    const userWithId = await userRepository.findById(id);
    if (userWithId === null) {
      throw new Error(ERROR_MESSAGES.ID_NOT_EXIST);
    }
    const userWithEmail = await userRepository.findByEmail({ email: email });
    if (userWithEmail.length > 0) {
      throw new Error(ERROR_MESSAGES.ALREADY_CREATED);
    }
    const updatedUser = await userRepository.update(id, { name, age, email, tel, role });
    return updatedUser;
  }

  async delete(id) {
    const existingUser = await userRepository.findById(id);
    if (existingUser === null) {
      throw new Error(ERROR_MESSAGES.ID_NOT_EXIST);
    }
    const deleted = await userRepository.delete(id);
    return deleted;
  }
}

const userService = new UserService();
module.exports = userService;
