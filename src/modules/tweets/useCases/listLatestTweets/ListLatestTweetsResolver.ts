import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/shared/infra/http/guards/AuthorizationGuard';
import { Tweet } from '../../models/Tweet';
import { ListLatestTweetsUseCase } from './ListLatestTweetsUseCase';

@Resolver()
@UseGuards(AuthorizationGuard)
export class ListLatestTweetsResolver {
  constructor(private listLatestTweetsUseCase: ListLatestTweetsUseCase) {}

  @Query(() => [Tweet])
  async listLatestTweets() {
    return this.listLatestTweetsUseCase.execute();
  }
}
