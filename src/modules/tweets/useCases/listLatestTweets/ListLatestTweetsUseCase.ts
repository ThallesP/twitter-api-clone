import { Inject, Injectable } from '@nestjs/common';
import { ITweetsRepository } from '../../repositories/ITweetsRepository';

@Injectable()
export class ListLatestTweetsUseCase {
  constructor(
    @Inject(ITweetsRepository) private tweetsRepository: ITweetsRepository,
  ) {}

  async execute() {
    const tweets = await this.tweetsRepository.listLatestTweets();

    return tweets;
  }
}
