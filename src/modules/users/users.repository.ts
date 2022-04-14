import { User } from './interfaces/user';
import { UserSchema } from '../../schemas/users-schema';
import { UserParameters } from './interfaces/parameters';

class UserRepository {
  async findByEmail(email: User['email']): Promise<User> {
    const usersArr: Array<User> = await UserSchema.find({ email: email }).exec();

    return usersArr[0] || null;
  }

  async findById(id: User['_id']): Promise<User | null> {
    let user: User;
    try {
      user = await UserSchema.findById(id).exec();
    } catch (error) {
      user = null;
    }
    return user;
  }

  update(user: User): Promise<User> {
    return UserSchema.findByIdAndUpdate(user['id'], user, { new: true }).exec();
  }

  delete(id: User['_id']): Promise<void> {
    return UserSchema.findByIdAndDelete(id).exec();
  }

  async create(user: User): Promise<User> {
    const createdUsers = await UserSchema.insertMany([user]);
    return createdUsers[0];
  }

  async findAndSort(parameters: UserParameters): Promise<User[]> {
    let exspectedUsers = UserSchema.find();
    if (parameters?.filterBy && parameters?.filterText) {
      exspectedUsers.find({ [parameters.filterBy]: parameters.filterText });
    }

    if (parameters?.sortBy) {
      if (parameters?.direction === 'asc') {
        exspectedUsers.sort({ [parameters.sortBy]: 1 });
      } else if (parameters?.direction === 'desc') {
        exspectedUsers.sort({ [parameters.sortBy]: -1 });
      }
    } else {
      exspectedUsers.sort({ createAt: -1 });
    }

    if (parameters?.skip) {
      exspectedUsers.skip(parameters.skip);
    }
    if (parameters?.limit) {
      exspectedUsers.limit(parameters.limit);
    }
    let receivedUsers = exspectedUsers.exec();
    return receivedUsers;
  }
}

const userRepository = new UserRepository();
export { userRepository };
