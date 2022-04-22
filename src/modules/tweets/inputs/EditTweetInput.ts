import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class EditTweetInput {
  @Field()
  tweetId: string;

  userId: string;

  @Field()
  text: string;
}
