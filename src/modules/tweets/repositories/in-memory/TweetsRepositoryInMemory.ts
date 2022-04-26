import { CreateTweetInput } from '../../inputs/CreateTweetInput';
import { Tweet } from '@prisma/client';
import { ITweetsRepository } from '../ITweetsRepository';
import { v4 as uuidV4 } from 'uuid';

export class TweetsRepositoryInMemory implements ITweetsRepository {
  private tweets: Tweet[] = [];

  async create({ text, authorId }: CreateTweetInput): Promise<Tweet> {
    const tweet = {
      id: uuidV4(),
      text,
      authorId,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    this.tweets.push(tweet);

    return tweet;
  }

  async findById(id: string): Promise<Tweet> {
    const tweet = this.tweets.find((t) => t.id === id);

    if (!tweet) {
      throw new Error('Tweet not found');
    }

    return tweet;
  }

  async listLatestTweets(): Promise<Tweet[]> {
    return this.tweets
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10);
  }

  async softDelete(id: string): Promise<Tweet> {
    const tweet = await this.findById(id);

    tweet.deletedAt = new Date();

    return tweet;
  }

  async update({
    id,
    newTweet,
  }: {
    id: string;
    newTweet: Partial<Tweet>;
  }): Promise<Tweet> {
    const tweet = await this.findById(id);

    Object.assign(tweet, newTweet);

    return tweet;
  }
}
