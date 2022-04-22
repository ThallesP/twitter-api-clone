import { Injectable } from '@nestjs/common';
import { Tweet } from '@prisma/client';
import { CreateTweetInput } from 'src/modules/tweets/inputs/CreateTweetInput';
import {
  ITweetsRepository,
  IUpdateTweet,
} from 'src/modules/tweets/repositories/ITweetsRepository';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';

@Injectable()
export class PrismaTweetsRepository implements ITweetsRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(id: string): Promise<Tweet> {
    return this.prismaService.tweet.findUnique({ where: { id } });
  }

  async create({ text, authorId }: CreateTweetInput): Promise<Tweet> {
    const tweet = await this.prismaService.tweet.create({
      data: { text, authorId },
    });

    return tweet;
  }

  async update({ id, newTweet }: IUpdateTweet): Promise<Tweet> {
    return this.prismaService.tweet.update({
      where: { id },
      data: { ...newTweet },
    });
  }
}
