import { Inject, Injectable } from '@nestjs/common';
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

    if (!user || user.verificationCode !== verificationCode) {
      throw new PhoneNumberVerificationFailedException();
    }

    return user;
  }
}
