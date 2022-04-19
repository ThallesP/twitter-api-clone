import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class VerifyUserPhoneNumberInput {
  @Field()
  userId: string;

  @Field()
  verificationCode: string;
}
