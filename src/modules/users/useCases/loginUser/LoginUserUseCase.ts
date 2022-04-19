import { Inject } from '@nestjs/common';
import { compare } from 'bcrypt';
import { PasswordInvalidOrUserNotFoundException } from '../../exceptions/PasswordInvalidOrUserNotFoundException';
import { LoginUserInput } from '../../inputs/LoginUserInput';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

export class LoginUserUseCase {
  private JWT_SECRET: string;

  constructor(
    @Inject(IUsersRepository) private usersRepository: IUsersRepository,
    private configService: ConfigService,
  ) {
    this.JWT_SECRET = configService.get('JWT_SECRET');
  }

  async execute({ password, phoneNumber }: LoginUserInput) {
    const user = await this.usersRepository.findByPhoneNumber(phoneNumber);

    if (!user) {
      throw new PasswordInvalidOrUserNotFoundException();
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new PasswordInvalidOrUserNotFoundException();
    }

    const accessToken = sign({ phoneNumber }, this.JWT_SECRET, {
      subject: user.id,
    });

    return {
      accessToken,
      user,
    };
  }
}
