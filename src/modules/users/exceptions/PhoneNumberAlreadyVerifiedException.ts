import { HttpException } from '@nestjs/common';

export class PhoneNumberAlreadyVerifiedException extends HttpException {
  constructor() {
    super('You already have verified your phone number!', 400);
  }
}
