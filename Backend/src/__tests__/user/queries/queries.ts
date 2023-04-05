import { ICreateUser, IGetUser, ILogin, IValidateToken } from '../../../interfaces/interfacesUser';
import request from 'supertest-graphql';
import { ResponseCreateUser, TypesQueriesUser } from './types';

const typesQueriesUser = new TypesQueriesUser();

export class QueriesUser {
	async getUser(url: string, variables: IGetUser) {
		const { data, errors } = await request(url)
			.mutate(typesQueriesUser.GET_USER)
			.variables({ ...variables });

		return { data, errors };
	}

	async createUser(url: string, variables: ICreateUser) {
		const { data, errors } = await request<ResponseCreateUser>(url)
			.mutate(typesQueriesUser.CREATE_USER)
			.variables({ ...variables });

		return { data, errors };
	}

	async login(url: string, variables: ILogin) {
		const { data, errors } = await request(url)
			.mutate(typesQueriesUser.LOGIN)
			.variables({ ...variables });

		return { data, errors };
	}

	async validateToken(url: string, variables: IValidateToken) {
		const { data, errors } = await request(url)
			.mutate(typesQueriesUser.VALIDATE_TOKEN)
			.variables({ ...variables });

		return { data, errors };
	}
}
