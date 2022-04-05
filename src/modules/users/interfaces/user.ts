import { Role } from '../../../enums/role';

export interface User {
  readonly _id: string;
  name: string;
  age: number;
  readonly email: string;
  tel: number;
  role: Role;
}
