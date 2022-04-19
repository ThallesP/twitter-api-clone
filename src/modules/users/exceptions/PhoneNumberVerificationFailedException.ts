import { HttpException, HttpStatus } from '@nestjs/common';

export class PhoneNumberVerificationFailedException extends HttpException {
  constructor() {
    super('Verification code invalid!', HttpStatus.BAD_REQUEST);
  }
}
