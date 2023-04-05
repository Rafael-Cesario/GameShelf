import mongoose from 'mongoose';
import { describe, it, expect, afterAll, afterEach, beforeAll } from 'vitest';
import { startDatabase } from '../../database';
import { startServer } from '../../server';
import { Errors } from '../../utils/responses';
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

	it(`Returns a user with empty password`, async () => {
		const { email } = defaultUser;
		const { data } = await queriesUser.getUser(url, { email });
		expect(data?.getUser).toEqual({ email, password: '' });
	});

	it(`Can't get user, email was not provided`, async () => {
		const { errors } = await queriesUser.getUser(url, { email: '' });
		expect(errors![0].message).toBe(Errors.emptyVariable + 'Email was not provided');
	});

	it(`Didn't find the user`, async () => {
		const { errors } = await queriesUser.getUser(url, { email: 'EmailThatDoesNotExist' });
		expect(errors![0].message).toBe(Errors.userNotFound);
	});
});
