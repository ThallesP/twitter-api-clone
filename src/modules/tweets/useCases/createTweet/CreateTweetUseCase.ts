import { Inject } from '@nestjs/common';
import { TweetExceedMaxCharactersException } from '../../exceptions/TweetExceedMaxCharactersException';
import { CreateTweetInput } from '../../inputs/CreateTweetInput';
import { ITweetsRepository } from '../../repositories/ITweetsRepository';

export class CreateTweetUseCase {
  constructor(
    @Inject(ITweetsRepository) private tweetsRepository: ITweetsRepository,
  ) {}

  async execute({ text, authorId }: CreateTweetInput) {
    if (text.length > 280) {
      throw new TweetExceedMaxCharactersException();
    }

    console.log(this.tweetsRepository);
    const tweet = await this.tweetsRepository.create({ text, authorId });

    return tweet;
  }
}
