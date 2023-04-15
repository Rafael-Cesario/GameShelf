import request from 'supertest-graphql';
import gql from 'graphql-tag';
import {
	ICreateUser,
	IGetUser,
	ILogin,
	IValidateToken,
	ResponseCreateUser,
	ResponseGetUser,
	ResponseLogin,
	ResponseValidateToken,
} from '../../interfaces/IUsers';

export class QueriesUser {
	async getUser(url: string, variables: IGetUser) {
		const { data, errors } = await request<ResponseGetUser>(url)
			.mutate(GET_USER)
			.variables({ ...variables });

		return { data, errors };
	}

	async createUser(url: string, variables: ICreateUser) {
		const { data, errors } = await request<ResponseCreateUser>(url)
			.mutate(CREATE_USER)
			.variables({ ...variables });

		return { data, errors };
	}

	async login(url: string, variables: ILogin) {
		const { data, errors } = await request<ResponseLogin>(url)
			.mutate(LOGIN)
			.variables({ ...variables });

		return { data, errors };
	}

	async validateToken(url: string, variables: IValidateToken) {
		const { data, errors } = await request<ResponseValidateToken>(url)
			.mutate(VALIDATE_TOKEN)
			.variables({ ...variables });

		return { data, errors };
	}
}

const GET_USER = gql`
	query GetUser($email: String!) {
		getUser(email: $email) {
			email
			password
		}
	}
`;

const CREATE_USER = gql`
	mutation CreateUser($createUser: CreateUser!) {
		createUser(createUser: $createUser) {
			message
		}
	}
`;

const LOGIN = gql`
	mutation Login($login: Login!) {
		login(login: $login) {
			message
			token
		}
	}
`;

const VALIDATE_TOKEN = gql`
	query ValidateToken($token: String!) {
		validateToken(token: $token) {
			message
		}
	}
`;
