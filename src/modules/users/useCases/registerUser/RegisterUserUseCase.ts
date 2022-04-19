import { Inject, Injectable } from '@nestjs/common';
import { ISMSProvider } from 'src/shared/providers/ISMSProvider';
import { RegisterUserInput } from '../../inputs/RegisterUserInput';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import crypto from 'node:crypto';
import { hash } from 'bcrypt';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(IUsersRepository) private usersRepository: IUsersRepository,
    @Inject(ISMSProvider) private smsProvider: ISMSProvider,
  ) {}

  async execute({ name, password, phoneNumber }: RegisterUserInput) {
    const verificationCode = crypto.randomInt(10000, 99999).toString();

    await this.smsProvider.send(
      phoneNumber,
      `Welcome aboard! Here's your verification code: ${verificationCode}`,
    );

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      password: passwordHash,
      verificationCode,
      phoneNumber,
    });

    return user;
  }
}
