import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterUserInput {
  @Field()
  name: string;

  @Field()
  phoneNumber: string;

  numberVerified?: boolean;

  verificationCode?: string;

  @Field()
  password: string;
}
