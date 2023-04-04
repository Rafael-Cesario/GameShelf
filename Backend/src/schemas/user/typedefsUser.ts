import gql from 'graphql-tag';

export const typedefsUser = gql`
	type User {
		email: String!
		password: String!
	}

	type Query {
		getUsers: [User]!
	}
`;
