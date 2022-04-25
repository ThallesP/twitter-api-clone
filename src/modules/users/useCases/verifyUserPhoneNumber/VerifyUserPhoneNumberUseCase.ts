import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign } from 'jsonwebtoken';
import { PhoneNumberAlreadyVerifiedException } from '../../exceptions/PhoneNumberAlreadyVerifiedException';
import { PhoneNumberVerificationFailedException } from '../../exceptions/PhoneNumberVerificationFailedException';
import { VerifyUserPhoneNumberInput } from '../../inputs/VerifyUserPhoneNumberInput';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@Injectable()
export class VerifyUserPhoneNumberUseCase {
  private JWT_SECRET: string;
  constructor(
    @Inject(IUsersRepository) private usersRepository: IUsersRepository,
    configService: ConfigService,
  ) {
    this.JWT_SECRET = configService.get('JWT_SECRET');
  }

  async execute({ userId, verificationCode }: VerifyUserPhoneNumberInput) {
    const user = await this.usersRepository.findUserById(userId);

    if (user.numberVerified) {
      throw new PhoneNumberAlreadyVerifiedException();
    }

    if (user.verificationCode !== verificationCode) {
      throw new PhoneNumberVerificationFailedException();
    }

    const userUpdated = await this.usersRepository.update({
      id: user.id,
      newUser: { numberVerified: true },
    });

    const accessToken = sign(
      { phoneNumber: user.phoneNumber, numberVerified: user.numberVerified },
      this.JWT_SECRET,
      {
        subject: user.id,
      },
    );

    return { accessToken, user: userUpdated };
  }
}
