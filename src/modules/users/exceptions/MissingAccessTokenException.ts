import { HttpException } from '@nestjs/common';

export class MissingAccessTokenException extends HttpException {
  constructor() {
    super('Access token is missing!', 401);
  }
}
