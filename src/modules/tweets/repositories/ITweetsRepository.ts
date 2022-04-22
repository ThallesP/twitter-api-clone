import { Tweet } from '@prisma/client';
import { CreateTweetInput } from '../inputs/CreateTweetInput';

export interface IUpdateTweet {
  id: string;
  newTweet: Partial<Tweet>;
}

export interface ITweetsRepository {
  create({ text, authorId }: CreateTweetInput): Promise<Tweet>;
  findById(id: string): Promise<Tweet>;
  update({ id, newTweet }: IUpdateTweet): Promise<Tweet>;
}

export const ITweetsRepository = Symbol('ITweetsRepository');
