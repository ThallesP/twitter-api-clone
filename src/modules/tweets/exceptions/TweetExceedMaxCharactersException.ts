import { HttpException } from '@nestjs/common';

export class TweetExceedMaxCharactersException extends HttpException {
  constructor() {
    super('Your Tweet exceed the maximum of 280 characters!', 400);
  }
}
