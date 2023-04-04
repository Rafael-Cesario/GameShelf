import gql from 'graphql-tag';

export const typedefsUser = gql`
	type User {
		email: String!
		password: String!
	}

	type Query {
		getUser(email: String!): User!
	}

	input CreateUser {
		email: String!
		password: String!
	}

	type Response {
		message: String!
	}

	type Mutation {
		createUser(createUser: CreateUser!): Response!
	}
`;
