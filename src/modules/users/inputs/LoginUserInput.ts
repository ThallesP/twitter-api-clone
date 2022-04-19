import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
  @Field()
  phoneNumber: string;

  @Field()
  password: string;
}
