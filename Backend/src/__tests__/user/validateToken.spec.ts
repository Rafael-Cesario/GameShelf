import mongoose from 'mongoose';
import { describe, expect, afterAll, beforeAll, test } from 'vitest';
import { startDatabase } from '../../database';
import { startServer } from '../../server';
import { QueriesUser } from './queries/queries';

describe('Create user', () => {
	const defaultUser = { email: 'teste@teste.com', password: '123123' };
	const queriesUser = new QueriesUser();
	let url: string;

	beforeAll(async () => {
		url = await startServer(0);
		await startDatabase();
		await queriesUser.createUser(url, { createUser: { ...defaultUser } });
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});

	test('Token is valid', async () => {
		const { email, password } = defaultUser;
		const { data } = await queriesUser.login(url, { login: { email, password } });
		const token = data?.login.token!;
		const { data: isTokenValid } = await queriesUser.validateToken(url, { token });
		expect(isTokenValid?.validateToken.message).toBe('true');
	});

	test('Token is not valid', async () => {
		let token = 'InvalidToken';
		let { data } = await queriesUser.validateToken(url, { token });
		expect(data?.validateToken.message).toBe('false');

		token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

		({ data } = await queriesUser.validateToken(url, { token }));
		expect(data?.validateToken.message).toBe('false');
	});

	test('Token is empty', async () => {
		const { data } = await queriesUser.validateToken(url, { token: '' });
		expect(data?.validateToken.message).toBe('false');
	});
});
