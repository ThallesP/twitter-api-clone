import { User } from '@prisma/client';
import { RegisterUserInput } from '../inputs/RegisterUserInput';

export interface IUpdateUser {
  id: string;
  newUser: Partial<User>;
}

export interface IUsersRepository {
  create({ name, password, phoneNumber }: RegisterUserInput): Promise<User>;

  findUserById(id: string): Promise<User | null>;

  findByPhoneNumber(phoneNumber: string): Promise<User | null>;

  update({ id, newUser }: IUpdateUser): Promise<User>;
}

export const IUsersRepository = Symbol('IUsersRepository');
