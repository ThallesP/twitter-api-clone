import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class DummyQueryResolver {
  @Query(() => String)
  async dummy() {
    return 'dummy';
  }
}
