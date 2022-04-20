import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { log } from 'console';
import {
  AuthUser,
  CurrentUser,
} from 'src/shared/infra/http/decorators/currentUser';
import { AuthorizationGuard } from 'src/shared/infra/http/guards/AuthorizationGuard';
import { CreateTweetInput } from '../../inputs/CreateTweetInput';
import { Tweet } from '../../models/Tweet';
import { CreateTweetUseCase } from './CreateTweetUseCase';

@Resolver()
@UseGuards(AuthorizationGuard)
export class CreateTweetResolver {
  constructor(private createTweetUseCase: CreateTweetUseCase) {}

  @Mutation(() => Tweet)
  async createTweet(
    @Args('data') { text }: CreateTweetInput,
    @CurrentUser() { userId }: AuthUser,
  ) {
    const tweet = await this.createTweetUseCase.execute({
      text,
      authorId: userId,
    });

    return tweet;
  }
}
