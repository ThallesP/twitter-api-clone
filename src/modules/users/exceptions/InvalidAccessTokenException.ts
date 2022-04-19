import { HttpException } from '@nestjs/common';

export class InvalidAccessTokenException extends HttpException {
  constructor() {
    super('Access token is invalid!', 401);
  }
}
