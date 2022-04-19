import { User } from '@prisma/client';
import { RegisterUserInput } from '../inputs/RegisterUserInput';

export interface IUsersRepository {
  create({ name, password, phoneNumber }: RegisterUserInput): Promise<User>;

  findUserById(id: string): Promise<User | null>;
}

export const IUsersRepository = Symbol('IUsersRepository');
