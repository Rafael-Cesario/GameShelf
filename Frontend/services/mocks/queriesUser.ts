import { graphql } from 'msw';
import { ILogin } from '@/interfaces/queriesUser';
import { Errors, IErrors } from '@/interfaces/interfaceResponses';

export const handlers = [
	graphql.mutation('Login', (req, res, ctx) => {
		const errorCode: keyof IErrors = 'authentication';
		return res(ctx.errors([{ message: `${errorCode}: ` }]));
	}),
];
