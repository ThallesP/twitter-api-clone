import { HttpException } from '@nestjs/common';

export class PasswordInvalidOrUserNotFoundException extends HttpException {
  constructor() {
    super("Password invalid or user doesn't exists!", 401);
  }
}
