import { Inject, Injectable } from '@nestjs/common';
import { PhoneNumberAlreadyVerifiedException } from '../../exceptions/PhoneNumberAlreadyVerifiedException';
import { PhoneNumberVerificationFailedException } from '../../exceptions/PhoneNumberVerificationFailedException';
import { VerifyUserPhoneNumberInput } from '../../inputs/VerifyUserPhoneNumberInput';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@Injectable()
export class VerifyUserPhoneNumberUseCase {
  constructor(
    @Inject(IUsersRepository) private usersRepository: IUsersRepository,
  ) {}

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

    return userUpdated;
  }
}
