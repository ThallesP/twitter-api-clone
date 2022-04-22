import { HttpException } from '@nestjs/common';

export class TweetIsNotYoursException extends HttpException {
  constructor() {
    super("The Tweet that you wan't edit is not yours!", 401);
  }
}
