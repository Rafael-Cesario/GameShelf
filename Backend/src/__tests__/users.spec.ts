import mongoose from 'mongoose';
import { Errors, Success } from '../interfaces/IResponses';
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { QueriesUser } from './__queries__/queriesUser';
import { startServer } from '../server';
import { startDatabase } from '../database';
import { ModelUser } from '../models/modelUser';

describe('Users', () => {
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

	describe('Create user', () => {
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

	describe('Get user', () => {
		it(`Returns a user with empty password`, async () => {
			await queriesUser.createUser(url, { createUser: { email: defaultUser.email, password: defaultUser.password } });
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

	describe('Login', () => {
		it(`Can't login with empty values`, async () => {
			await queriesUser.createUser(url, { createUser: { email: defaultUser.email, password: defaultUser.password } });
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
			await queriesUser.createUser(url, { createUser: { email: defaultUser.email, password: defaultUser.password } });
			const { email, password } = defaultUser;
			const { data } = await queriesUser.login(url, { login: { email, password } });
			expect(data?.login.message).toBe(Success.login);
			expect(data?.login.token).toBeDefined();
		});
	});

	describe('Validate token', () => {
		it('Token is valid', async () => {
			await queriesUser.createUser(url, { createUser: { email: defaultUser.email, password: defaultUser.password } });
			const { email, password } = defaultUser;
			const { data } = await queriesUser.login(url, { login: { email, password } });
			const token = data?.login.token!;
			const { data: isTokenValid } = await queriesUser.validateToken(url, { token });
			expect(isTokenValid?.validateToken.message).toBe('true');
		});

		it('Token is not valid', async () => {
			let token = 'InvalidToken';
			let { data } = await queriesUser.validateToken(url, { token });
			expect(data?.validateToken.message).toBe('false');

			token =
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

			({ data } = await queriesUser.validateToken(url, { token }));
			expect(data?.validateToken.message).toBe('false');
		});

		it('Token is empty', async () => {
			const { data } = await queriesUser.validateToken(url, { token: '' });
			expect(data?.validateToken.message).toBe('false');
		});
	});
});
