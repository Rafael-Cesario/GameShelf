import { graphql } from 'msw';
import { ILogin } from '@/interfaces/queriesUser';

export const handlers = [
	graphql.mutation('Login', (req, res, ctx) => {
		return res(ctx.errors([{ message: 'duplicatedUser: Teste' }]));
	}),
];
