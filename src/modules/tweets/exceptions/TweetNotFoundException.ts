import { HttpException } from '@nestjs/common';

export class TweetNotFoundException extends HttpException {
  constructor() {
    super('Tweet not found', 404);
  }
}
