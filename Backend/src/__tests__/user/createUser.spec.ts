import mongoose from 'mongoose';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { startServer } from '../../server';
import { startDatabase } from '../../database';
import { QueriesUser } from './queries/queries';
import { ModelUser } from '../../models/modelUser';
import { Errors, Success } from '../../interfaces/interfaceResponses';

describe('Create user', () => {
	const defaultUser = { email: 'teste@teste.com', password: '123123' };
	const queriesUser = new QueriesUser();
	let url: string;

	beforeAll(async () => {
		url = await startServer(0);
		await startDatabase();
	});

	afterEach(async () => {
		await ModelUser.deleteMany({});
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});

	it('create a new user', async () => {
		const { email, password } = defaultUser;

		const { data } = await queriesUser.createUser(url, { createUser: { email, password } });

		const users = await ModelUser.find({});
		expect(users.length).toBe(1);

		expect(data?.createUser.message).toMatch(Success.newUser);
	});

	it(`Password should be hashed`, async () => {
		const { email, password } = defaultUser;
		await queriesUser.createUser(url, { createUser: { email, password } });

		const user = await ModelUser.findOne({ email });
		expect(user?.password).not.toBe(password);
	});

	it(`Can't create a user with existed email`, async () => {
		const { email, password } = defaultUser;
		await queriesUser.createUser(url, { createUser: { email, password } });
		const { errors } = await queriesUser.createUser(url, { createUser: { email, password } });
		expect(errors![0].message).toBe(Errors.duplicatedUser);
	});

	it(`Can't create with emtpy values`, async () => {
		const { errors } = await queriesUser.createUser(url, { createUser: { email: '', password: '' } });
		expect(errors![0].message).toBe(Errors.emptyVariable + 'Email was not provided, Password was not provided');
	});
});
