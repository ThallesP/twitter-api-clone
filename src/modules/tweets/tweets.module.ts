import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';
import { PrismaTweetsRepository } from './infra/prisma/repositories/PrismaTweetsRepository';
import { ITweetsRepository } from './repositories/ITweetsRepository';
import { CreateTweetResolver } from './useCases/createTweet/CreateTweetResolver';
import { CreateTweetUseCase } from './useCases/createTweet/CreateTweetUseCase';
import { DeleteTweetResolver } from './useCases/deleteTweet/DeleteTweetResolver';
import { DeleteTweetUseCase } from './useCases/deleteTweet/DeleteTweetUseCase';
import { EditTweetResolver } from './useCases/editTweet/EditTweetResolver';
import { EditTweetUseCase } from './useCases/editTweet/EditTweetUseCase';
import { ListLatestTweetsResolver } from './useCases/listLatestTweets/ListLatestTweetsResolver';
import { ListLatestTweetsUseCase } from './useCases/listLatestTweets/ListLatestTweetsUseCase';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    CreateTweetResolver,
    EditTweetResolver,
    DeleteTweetResolver,
    ListLatestTweetsResolver,
    {
      provide: ITweetsRepository,
      useClass: PrismaTweetsRepository,
    },
    CreateTweetUseCase,
    EditTweetUseCase,
    DeleteTweetUseCase,
    ListLatestTweetsUseCase,
    PrismaService,
  ],
})
export class TweetsModule {}
