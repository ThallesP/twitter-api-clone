import { Inject, Injectable } from '@nestjs/common';
import { TweetExceedMaxCharactersException } from '../../exceptions/TweetExceedMaxCharactersException';
import { TweetIsNotYoursException } from '../../exceptions/TweetIsNotYoursException';
import { EditTweetInput } from '../../inputs/EditTweetInput';
import { ITweetsRepository } from '../../repositories/ITweetsRepository';

@Injectable()
export class EditTweetUseCase {
  constructor(
    @Inject(ITweetsRepository) private tweetsRepository: ITweetsRepository,
  ) {}

  async execute({ text, tweetId, userId }: EditTweetInput) {
    const isTweetOwnedByUser = await this.tweetsRepository.findById(tweetId);

    if (isTweetOwnedByUser.authorId != userId) {
      throw new TweetIsNotYoursException();
    }

    if (text.length > 280) {
      throw new TweetExceedMaxCharactersException();
    }

    const tweet = await this.tweetsRepository.update({
      id: tweetId,
      newTweet: { text },
    });

    return tweet;
  }
}
