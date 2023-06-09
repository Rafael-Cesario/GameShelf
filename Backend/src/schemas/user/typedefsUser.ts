import gql from 'graphql-tag';

export const typedefsUser = gql`
	type User {
		email: String!
		password: String!
	}

	type Response {
		message: String!
		token: String
	}

	input CreateUser {
		email: String!
		password: String!
	}

	input Login {
		email: String!
		password: String!
	}

	type Query {
		getUser(email: String!): User!
		validateToken(token: String!): Response!
	}

	type Mutation {
		createUser(createUser: CreateUser!): Response!
		login(login: Login!): Response!
	}
`;
