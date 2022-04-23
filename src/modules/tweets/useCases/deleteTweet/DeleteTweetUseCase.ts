import { Inject } from '@nestjs/common';
import { TweetIsNotYoursException } from '../../exceptions/TweetIsNotYoursException';
import { TweetNotFoundException } from '../../exceptions/TweetNotFoundException';
import { DeleteTweetInput } from '../../inputs/DeleteTweetInput';
import { ITweetsRepository } from '../../repositories/ITweetsRepository';

export class DeleteTweetUseCase {
  constructor(
    @Inject(ITweetsRepository) private tweetsRepository: ITweetsRepository,
  ) {}

  async execute({ id, userId }: DeleteTweetInput): Promise<void> {
    const tweetExists = await this.tweetsRepository.findById(id);

    if (!tweetExists) {
      throw new TweetNotFoundException();
    }

    if (tweetExists.authorId != userId) {
      throw new TweetIsNotYoursException();
    }

    await this.tweetsRepository.softDelete(id);
  }
}
