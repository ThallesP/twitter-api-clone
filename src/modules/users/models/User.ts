import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  numberVerified: boolean;

  @Field()
  phoneNumber: string;

  verificationCode: string;

  password: string;
}
