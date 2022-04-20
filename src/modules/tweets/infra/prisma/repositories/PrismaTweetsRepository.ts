import { Injectable } from '@nestjs/common';
import { Tweet } from '@prisma/client';
import { CreateTweetInput } from 'src/modules/tweets/inputs/CreateTweetInput';
import { ITweetsRepository } from 'src/modules/tweets/repositories/ITweetsRepository';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';

@Injectable()
export class PrismaTweetsRepository implements ITweetsRepository {
  constructor(private prismaClient: PrismaService) {}

  async create({ text, authorId }: CreateTweetInput): Promise<Tweet> {
    const tweet = await this.prismaClient.tweet.create({
      data: { text, authorId },
    });

    return tweet;
  }
}
