import { Tweet } from '@prisma/client';
import { CreateTweetInput } from '../inputs/CreateTweetInput';

export interface ITweetsRepository {
  create({ text, authorId }: CreateTweetInput): Promise<Tweet>;
}

export const ITweetsRepository = Symbol('ITweetsRepository');
