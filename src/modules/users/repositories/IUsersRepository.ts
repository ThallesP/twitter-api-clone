import { User } from '@prisma/client';
import { RegisterUserInput } from '../inputs/RegisterUserInput';

export interface IUsersRepository {
  create({ name, password, phoneNumber }: RegisterUserInput): Promise<User>;
}

export const IUsersRepository = Symbol('IUsersRepository');
