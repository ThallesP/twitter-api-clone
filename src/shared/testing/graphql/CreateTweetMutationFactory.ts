export function createTweetMutationFactory(text: string) {
  return `
    mutation {
      createTweet(
        data: {
          text: "${text}"
        }
      ) {
        text
      }
    }
  `;
}
