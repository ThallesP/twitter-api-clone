import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import {
  AuthUser,
  CurrentUser,
} from 'src/shared/infra/http/decorators/currentUser';
import { AuthorizationGuard } from 'src/shared/infra/http/guards/AuthorizationGuard';
import { VerifyUserPhoneNumberInput } from '../../inputs/VerifyUserPhoneNumberInput';
import { VerifyUserPhoneNumberUseCase } from './VerifyUserPhoneNumberUseCase';
import { Throttle } from '@nestjs/throttler';
import { GqlThrottlerGuard } from 'src/shared/infra/http/guards/GqlThrottlerGuard';
import { VerifyPhoneNumberMapper } from '../../mappers/VerifyPhoneNumberMapper';

@Resolver()
@Throttle(10, 20 * 60)
@UseGuards(AuthorizationGuard, GqlThrottlerGuard)
export class VerifyUserPhoneNumberResolver {
  constructor(private verifyphoneNumberUseCase: VerifyUserPhoneNumberUseCase) {}

  @Mutation(() => VerifyPhoneNumberMapper)
  async verifyPhoneNumber(
    @Args('data') { verificationCode }: VerifyUserPhoneNumberInput,
    @CurrentUser() { userId }: AuthUser,
  ) {
    const userVerified = await this.verifyphoneNumberUseCase.execute({
      verificationCode,
      userId,
    });

    return userVerified;
  }
}
