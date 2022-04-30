import { LoginUserInput } from '../../../modules/users/inputs/LoginUserInput';

export function loginUserMutationFactory({
  password,
  phoneNumber,
}: LoginUserInput) {
  return `
    mutation {
        loginUser(
            data: {
                password: "${password}"
                phoneNumber: "${phoneNumber}"
            }
        ) {
            accessToken
        }
    }
    `;
}
