import { HttpException } from '@nestjs/common';

export class TweetIsNotYoursException extends HttpException {
  constructor() {
    super('The Tweet is not yours!', 401);
  }
}
