import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class VerifyUserPhoneNumberInput {
  @Field()
  verificationCode: string;

  userId: string;
}
