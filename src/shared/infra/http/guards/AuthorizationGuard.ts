import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verify } from 'jsonwebtoken';
import { InvalidAccessTokenException } from 'src/modules/users/exceptions/InvalidAccessTokenException';
import { MissingAccessTokenException } from 'src/modules/users/exceptions/MissingAccessTokenException';

export interface IUserPayload {
  sub: string;
  phoneNumber: string;
  numberVerified: boolean;
}

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private JWT_SECRET: string;

  constructor(private configService: ConfigService) {
    this.JWT_SECRET = configService.get('JWT_SECRET');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { req, res } = GqlExecutionContext.create(context).getContext();

    if (!req.headers['authorization']) {
      throw new MissingAccessTokenException();
    }

    const [, token] = req.headers['authorization'].split(' ');

    if (!token) {
      throw new MissingAccessTokenException();
    }

    try {
      const payload = verify(token, this.JWT_SECRET) as IUserPayload;

      req.user = {
        userId: payload.sub,
        phoneNumber: payload.phoneNumber,
        numberVerified: payload.numberVerified,
      };

      return true;
    } catch (error) {
      throw new InvalidAccessTokenException();
    }

    return false;
  }
}
