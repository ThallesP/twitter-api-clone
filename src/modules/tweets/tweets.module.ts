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

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    CreateTweetResolver,
    EditTweetResolver,
    DeleteTweetResolver,
    {
      provide: ITweetsRepository,
      useClass: PrismaTweetsRepository,
    },
    CreateTweetUseCase,
    EditTweetUseCase,
    DeleteTweetUseCase,
    PrismaService,
  ],
})
export class TweetsModule {}
