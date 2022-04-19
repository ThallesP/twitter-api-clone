import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { VerifyUserPhoneNumberInput } from '../../inputs/VerifyUserPhoneNumberInput';
import { User } from '../../models/User';
import { VerifyUserPhoneNumberUseCase } from './VerifyUserPhoneNumberUseCase';

@Resolver()
export class VerifyUserPhoneNumberResolver {
  constructor(private verifyphoneNumberUseCase: VerifyUserPhoneNumberUseCase) {}

  @Mutation(() => User)
  async verifyPhoneNumber(
    @Args('data') verifyUserPhoneNumberInput: VerifyUserPhoneNumberInput,
  ) {
    const userVerified = await this.verifyphoneNumberUseCase.execute(
      verifyUserPhoneNumberInput,
    );

    return userVerified;
  }
}
