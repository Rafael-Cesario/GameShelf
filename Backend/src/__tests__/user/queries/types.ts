import gql from 'graphql-tag';

export class TypesQueriesUser {
	GET_USER = gql`
		query GetUser($email: String!) {
			getUser(email: $email) {
				email
				password
			}
		}
	`;

	CREATE_USER = gql`
		mutation CreateUser($createUser: CreateUser!) {
			createUser(createUser: $createUser) {
				message
			}
		}
	`;

	LOGIN = gql`
		mutation Login($login: Login!) {
			login(login: $login) {
				message
				token
			}
		}
	`;

	VALIDATE_TOKEN = gql`
		query ValidateToken($token: String!) {
			validateToken(token: $token) {
				message
			}
		}
	`;
}

export interface ResponseCreateUser {
	createUser: { message: string };
}

export interface ResponseGetUser {
	getUser: { email: string; password: string };
}

export interface ResponseLogin {
	login: { message: string; token: string };
}
