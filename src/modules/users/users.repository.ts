import { User, UserWithoutId } from './interfaces/user';
import { UserSchema } from '../../schemas/users.schema';
import { UserParameters } from './interfaces/parameters';
import { userDocToUser } from '../../mappers/user.mapper';

class UserRepository {
  async findByEmail(email: User['email']): Promise<User> {
    const usersArr: Array<User> = await UserSchema.find({ email: email }).exec();
    const existingUserArr: User = userDocToUser(usersArr[0]);

    return existingUserArr || null;
  }

  async findById(id: User['id']): Promise<User | null> {
    let user: User;
    let existingUser: User;
    try {
      user = await UserSchema.findById(id).exec();
      existingUser = userDocToUser(user);
    } catch (error) {
      existingUser = null;
    }
    return existingUser;
  }

  async update(id, user: User): Promise<User> {
    const updatedUser = await UserSchema.findByIdAndUpdate(id, user, { new: true }).exec();
    const existingUser = userDocToUser(updatedUser);
    return existingUser;
  }

  delete(id: User['id']): Promise<void> {
    return UserSchema.findByIdAndDelete(id).exec();
  }

  async create(user: UserWithoutId): Promise<User> {
    const createdUsers = await UserSchema.insertMany([user]);
    const existingUser = userDocToUser(createdUsers[0]);
    return existingUser;
  }

  async findAndSort(parameters: UserParameters): Promise<User[]> {
    const sortedUsers = UserSchema.find({ [parameters.filterBy]: parameters.filterText })
      .sort({ [parameters.sortBy]: parameters.direction })
      .skip(parameters.skip)
      .limit(parameters.limit)
      .exec();

    const existingUsers = (await sortedUsers).map((item) => userDocToUser(item));
    return existingUsers;
  }
}

const userRepository = new UserRepository();
export { userRepository };
