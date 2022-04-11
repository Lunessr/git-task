// об'єкт з об'єктами філтер, сорт і пейджинг з ключами
// obj User ext userDocument
// <= function

import { User } from './interfaces/user';
import { UserSchema } from '../../schemas/users-schema';

const user = {};

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

  async findAndSort(parameters: {
    filter: {
      name: User['name'];
      surname: User['surname'];
      email: User['email'];
    };
    sort: {
      name: User['name'];
      email: User['email'];
      tel: User['tel'];
    };
    paging: {
      limit: number;
      skip: number;
    };
  }): Promise<User[]> {
    let exspectedUsers = UserSchema.find(parameters?.filter);
    if (parameters.filter) {
      exspectedUsers = UserSchema.find(parameters.filter);
    }
    exspectedUsers.sort(parameters?.sort);
    if (parameters.sort) {
      exspectedUsers.sort(parameters.sort);
    }
    exspectedUsers.skip(parameters?.paging?.skip);
    if (parameters.paging.skip) {
      exspectedUsers.skip(parameters.paging.skip);
    }
    exspectedUsers.limit(parameters?.paging?.limit);
    if (parameters.paging.limit) {
      exspectedUsers.limit(parameters.paging.limit);
    }
    let receivedUsers = exspectedUsers.exec();
    return receivedUsers;
  }
}

const userRepository = new UserRepository();
export { userRepository };
