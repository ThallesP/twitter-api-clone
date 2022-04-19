import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterUserInput {
  @Field()
  name: string;

  @Field()
  phoneNumber: string;

  @Field()
  password: string;
}
