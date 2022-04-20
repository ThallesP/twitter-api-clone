import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './shared/infra/prisma/prisma.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { TweetsModule } from './modules/tweets/tweets.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => ({ req, res }),
    }),
    ThrottlerModule.forRoot(),
    TweetsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
