import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/shared/infra/http/guards/AuthorizationGuard';
import { OnlyNumberVerifiedGuard } from 'src/shared/infra/http/guards/OnlyNumberVerifiedGuard';
import { Tweet } from '../../models/Tweet';
import { ListLatestTweetsUseCase } from './ListLatestTweetsUseCase';

@Resolver()
@UseGuards(AuthorizationGuard, OnlyNumberVerifiedGuard)
export class ListLatestTweetsResolver {
  constructor(private listLatestTweetsUseCase: ListLatestTweetsUseCase) {}

  @Query(() => [Tweet])
  async listLatestTweets() {
    return this.listLatestTweetsUseCase.execute();
  }
}
