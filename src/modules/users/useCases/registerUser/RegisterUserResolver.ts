import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RegisterUserInput } from '../../inputs/RegisterUserInput';
import { User } from '../../models/User';
import { RegisterUserUseCase } from './RegisterUserUseCase';

@Resolver(() => User)
export class RegisterUserResolver {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  @Mutation(() => User)
  async registerUser(@Args('data') registerUser: RegisterUserInput) {
    const user = await this.registerUserUseCase.execute(registerUser);

    return user;
  }
}
