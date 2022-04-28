import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  AuthUser,
  CurrentUser,
} from '../../../../shared/infra/http/decorators/currentUser';
import { AuthorizationGuard } from '../../../../shared/infra/http/guards/AuthorizationGuard';
import { OnlyNumberVerifiedGuard } from '../../../../shared/infra/http/guards/OnlyNumberVerifiedGuard';
import { CreateTweetInput } from '../../inputs/CreateTweetInput';
import { Tweet } from '../../models/Tweet';
import { CreateTweetUseCase } from './CreateTweetUseCase';

@Resolver()
@UseGuards(AuthorizationGuard, OnlyNumberVerifiedGuard)
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
