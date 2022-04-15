import { Role } from '../../../enums/role';

export interface User {
  _id: string;
  name: string;
  surname: string;
  age: number;
  email: string;
  tel: number;
  role: Role;
}

export type UserWithoutId = Omit<User, '_id'>;
