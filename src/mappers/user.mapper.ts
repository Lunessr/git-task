import { User, UserWithoutPass } from '../modules/users/interfaces/user';

export const userDocToUser = (user: User): User => {
  const existingUser: User = {
    id: user.id,
    name: user.name,
    surname: user.surname,
    age: user.age,
    email: user.email,
    tel: user.tel,
    role: user.role,
    password: user.password,
  };
  return existingUser;
};

export const userDocToUserWithoutPass = (user: User): UserWithoutPass => {
  const existingUser: UserWithoutPass = {
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
