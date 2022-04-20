import { User } from '../modules/users/interfaces/user';

export const userDocToUser = (user: User): User => {
  const existingUser: User = {
    id: user.id,
    name: user.name,
    surname: user.surname,
    age: user.age,
    email: user.email,
    tel: user.tel,
    role: user.role,
  };
  return existingUser;
};
