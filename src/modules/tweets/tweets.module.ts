import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';
import { PrismaTweetsRepository } from './infra/prisma/repositories/PrismaTweetsRepository';
import { ITweetsRepository } from './repositories/ITweetsRepository';
import { CreateTweetResolver } from './useCases/createTweet/CreateTweetResolver';
import { CreateTweetUseCase } from './useCases/createTweet/CreateTweetUseCase';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    CreateTweetResolver,
    {
      provide: ITweetsRepository,
      useClass: PrismaTweetsRepository,
    },
    CreateTweetUseCase,
    PrismaService,
  ],
})
export class TweetsModule {}
