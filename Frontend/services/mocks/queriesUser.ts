import { graphql } from 'msw';
import { ILogin } from '@/interfaces/queriesUser';
import { Errors, IErrors, ISuccess } from '@/interfaces/interfaceResponses';

export const handlers = [
	graphql.mutation('Login', (req, res, ctx) => {
		const { login } = req.variables as ILogin;
		const { email, password } = login;

		if (email === 'wrong') {
			const errorCode: keyof IErrors = 'authentication';
			return res(ctx.errors([{ message: `${errorCode}: ` }]));
		}

		const sucessCode: keyof ISuccess = 'login';
		return res(ctx.data({ login: { message: `${sucessCode}: `, token: 'dummyToken!' } }));
	}),
];
