import { Inject, Injectable } from '@nestjs/common';
import { RegisterUserInput } from '../../inputs/RegisterUserInput';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(IUsersRepository) private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, password, phoneNumber }: RegisterUserInput) {
    const user = await this.usersRepository.create({
      name,
      password,
      phoneNumber,
    });

    return user;
  }
}
