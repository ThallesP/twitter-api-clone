import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTweetInput {
  @Field()
  text: string;

  authorId: string;
}
