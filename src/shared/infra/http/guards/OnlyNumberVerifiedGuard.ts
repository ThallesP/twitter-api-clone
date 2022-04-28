import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PhoneNumberNotVerifiedException } from '../../../../modules/users/exceptions/PhoneNumberNotVerifiedException';

@Injectable()
export class OnlyNumberVerifiedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { req } = GqlExecutionContext.create(context).getContext();

    if (!req.user.numberVerified) {
      throw new PhoneNumberNotVerifiedException();
    }

    return true;
  }
}
