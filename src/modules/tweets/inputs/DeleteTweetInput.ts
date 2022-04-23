import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteTweetInput {
  @Field()
  id: string;

  userId: string;
}
