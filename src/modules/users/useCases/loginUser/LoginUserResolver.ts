import { Mutation, Resolver } from '@nestjs/graphql';

// TODO
@Resolver()
export class LoginUserResolver {
  @Mutation(() => [])
  async loginUser() {}
}
