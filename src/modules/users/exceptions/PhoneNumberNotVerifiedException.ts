import { HttpException } from '@nestjs/common';

export class PhoneNumberNotVerifiedException extends HttpException {
  constructor() {
    super('Phone number not verified', 401);
  }
}
