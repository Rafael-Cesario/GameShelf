import gql from "graphql-tag";

class UserQueries {
	CREATE_USER = gql`
		mutation Mutation($createUserData: CreateUserInput!) {
			createUser(createUserData: $createUserData) {
				name
				id
				email
			}
		}
	`;
}

export const userQueries = new UserQueries();
