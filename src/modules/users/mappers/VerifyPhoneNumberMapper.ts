import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../models/User';

@ObjectType()
export class VerifyPhoneNumberMapper {
  @Field(() => String)
  accessToken: string;

  @Field(() => User)
  user: User;
}
