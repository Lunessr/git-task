import { User, UserWithoutId } from './interfaces/user';
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

  update(id, user: User): Promise<User> {
    return UserSchema.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  delete(id: User['_id']): Promise<void> {
    return UserSchema.findByIdAndDelete(id).exec();
  }

  async create(user: UserWithoutId): Promise<User> {
    const createdUsers = await UserSchema.insertMany([user]);
    return createdUsers[0];
  }

  async findAndSort(parameters: UserParameters): Promise<User[]> {
    return UserSchema.find({ [parameters.filterBy]: parameters.filterText })
      .sort({ [parameters.sortBy]: parameters.direction })
      .skip(parameters.skip)
      .limit(parameters.limit)
      .exec();
  }
}

const userRepository = new UserRepository();
export { userRepository };
