import { User } from './interfaces/user';
import { UserSchema } from '../../schemas/users-schema';

class UserRepository {
  public async findByEmail(email: User['email']): Promise<User> {
    const usersArr: Array<User> = await UserSchema.find({ email: email }).exec();

    return usersArr[0] || null;
  }

  findById = async (id: User['_id']): Promise<User | null> => {
    let user: User;
    try {
      user = await UserSchema.findById(id).exec();
    } catch (error) {
      user = null;
    }
    return user;
  };

  find(): Promise<User[]> {
    return UserSchema.find().sort({ createdAt: -1 }).exec();
  }

  update(id: User['_id'], User: User): Promise<User> {
    return UserSchema.findByIdAndUpdate(id, User, { new: true }).exec();
  }

  delete(id: User['_id']): Promise<void> {
    return UserSchema.findByIdAndDelete(id).exec();
  }

  async create(User: User): Promise<User> {
    const createdUser = await UserSchema.insertMany([User]);
    return createdUser[0];
  }
}

const userRepository = new UserRepository();
export { userRepository };
