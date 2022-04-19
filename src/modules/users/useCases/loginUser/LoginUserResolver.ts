import { Args, Field, Mutation, ObjectType, Resolver } from '@nestjs/graphql';
import { LoginUserInput } from '../../inputs/LoginUserInput';
import { User } from '../../models/User';
import { LoginUserUseCase } from './LoginUserUseCase';

@ObjectType()
class UserToken {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}

@Resolver(() => UserToken)
export class LoginUserResolver {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  @Mutation(() => UserToken)
  async loginUser(@Args('data') loginUserInput: LoginUserInput) {
    const userToken = await this.loginUserUseCase.execute(loginUserInput);

    return userToken;
  }
}
