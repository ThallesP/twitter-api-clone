import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Tweet {
  @Field()
  id: string;

  @Field()
  text: string;

  @Field()
  authorId: string;

  @Field()
  createdAt: Date;
}
