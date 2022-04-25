import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  AuthUser,
  CurrentUser,
} from 'src/shared/infra/http/decorators/currentUser';
import { AuthorizationGuard } from 'src/shared/infra/http/guards/AuthorizationGuard';
import { OnlyNumberVerifiedGuard } from 'src/shared/infra/http/guards/OnlyNumberVerifiedGuard';
import { EditTweetInput } from '../../inputs/EditTweetInput';
import { Tweet } from '../../models/Tweet';
import { EditTweetUseCase } from './EditTweetUseCase';

@Resolver()
@UseGuards(AuthorizationGuard, OnlyNumberVerifiedGuard)
export class EditTweetResolver {
  constructor(private editTweetUseCase: EditTweetUseCase) {}

  @Mutation(() => Tweet)
  async editTweet(
    @Args('data') { text, tweetId }: EditTweetInput,
    @CurrentUser() { userId }: AuthUser,
  ) {
    const updatedTweet = await this.editTweetUseCase.execute({
      text,
      tweetId,
      userId,
    });

    return updatedTweet;
  }
}
