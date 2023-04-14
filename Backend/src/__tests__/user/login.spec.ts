import mongoose from 'mongoose';
import { describe, it, expect, afterAll, afterEach, beforeAll } from 'vitest';
import { startDatabase } from '../../database';
import { startServer } from '../../server';
import { Errors, Success } from '../../interfaces/interfaceResponses';
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

	it(`Can't login with empty values`, async () => {
		const { errors } = await queriesUser.login(url, { login: { email: '', password: '' } });
		expect(errors![0].message).toBe(Errors.emptyVariable + 'Email was not provided, Password was not provided');
	});

	it(`Can't find the user`, async () => {
		const { errors } = await queriesUser.login(url, { login: { email: 'wrong', password: '123' } });
		expect(errors![0].message).toBe(Errors.authentication);
	});

	it(`Throws a error, password is wrong`, async () => {
		const { email } = defaultUser;
		const { errors } = await queriesUser.login(url, { login: { email, password: 'wrong' } });
		expect(errors![0].message).toBe(Errors.authentication);
	});

	it(`Returns a message and a token`, async () => {
		const { email, password } = defaultUser;
		const { data } = await queriesUser.login(url, { login: { email, password } });
		expect(data?.login.message).toBe(Success.login);
		expect(data?.login.token).toBeDefined();
	});
});
