import { graphql } from 'msw';
import { ICreateUser, ILogin } from '@/interfaces/queriesUser';
import { IErrors, ISuccess } from '@/interfaces/interfaceResponses';

export const handlers = [
	graphql.mutation('Login', (req, res, ctx) => {
		const { login } = req.variables as ILogin;
		const { email, password } = login;

		if (email === 'wrong') {
			const errorCode: keyof IErrors = 'authentication';
			return res(ctx.errors([{ message: `${errorCode}: ` }]));
		}

		const successCode: keyof ISuccess = 'login';
		return res(ctx.data({ login: { message: `${successCode}: `, token: 'dummyToken!' } }));
	}),

	graphql.mutation('CreateUser', (req, res, ctx) => {
		const { createUser } = req.variables as ICreateUser;

		if (createUser.email.match(/wrong/i)) {
			const errorCode: keyof IErrors = 'duplicatedUser';
			return res(ctx.errors([{ message: `${errorCode}: ` }]));
		}

		const successCode: keyof ISuccess = 'newUser';
		return res(ctx.data({ createUser: { message: `${successCode}: ` } }));
	}),
];
