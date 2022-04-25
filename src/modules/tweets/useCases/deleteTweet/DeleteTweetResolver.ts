import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  AuthUser,
  CurrentUser,
} from 'src/shared/infra/http/decorators/currentUser';
import { AuthorizationGuard } from 'src/shared/infra/http/guards/AuthorizationGuard';
import { OnlyNumberVerifiedGuard } from 'src/shared/infra/http/guards/OnlyNumberVerifiedGuard';
import { DeleteTweetInput } from '../../inputs/DeleteTweetInput';
import { DeleteTweetUseCase } from './DeleteTweetUseCase';

@Resolver()
@UseGuards(AuthorizationGuard, OnlyNumberVerifiedGuard)
export class DeleteTweetResolver {
  constructor(private deleteTweetUseCase: DeleteTweetUseCase) {}

  @Mutation(() => String)
  async deleteTweet(
    @Args('data') { id }: DeleteTweetInput,
    @CurrentUser() { userId }: AuthUser,
  ) {
    await this.deleteTweetUseCase.execute({ id, userId });

    return id;
  }
}
