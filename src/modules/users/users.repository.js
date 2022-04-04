const User = require('../../schemas/users-schema');

class UserRepository {
  findByEmail(email) {
    return User.find(email).exec();
  }

  async findById(id) {
    let user;
    try {
      user = await User.findById(id).exec();
    } catch (error) {
      user = null;
    }
    return user;
  }

  find() {
    return User.find().sort({ createdAt: -1 });
  }

  update(id, { name, age, email, tel, role }) {
    return User.findByIdAndUpdate(id, { name, age, email, tel, role }, { new: true });
  }

  delete(id) {
    return User.findByIdAndDelete(id);
  }

  create({ name, age, email, tel, role }) {
    return User.insertMany([{ name, age, email, tel, role }]);
  }
}

const userRepository = new UserRepository();
module.exports = userRepository;
