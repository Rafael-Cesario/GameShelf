import { GraphQLError } from 'graphql';
import { ICreateUser, IGetUser, ILogin } from '../interfaces/interfacesUser';
import { ModelUser } from '../models/modelUser';
import { checkPassword } from '../utils/crypt';
import { checkValues } from '../utils/emptyValues';
import { generateToken } from '../utils/generateToken';
import { Errors, Success } from '../utils/responses';

export class ServicesUser {
	async getUser({ email }: IGetUser) {
		if (!email) throw new GraphQLError(Errors.emptyVariable + ': email was not provided');

		const user = await ModelUser.findOne({ email });
		if (!user) throw new GraphQLError(Errors.userNotFound + ': user not found');

		return { email: user.email, password: '' };
	}

	async createUser({ createUser }: ICreateUser) {
		const hasEmptyValues = checkValues(createUser);
		if (hasEmptyValues) throw new GraphQLError(Errors.emptyVariable + ': ' + hasEmptyValues);

		const { email, password } = createUser;

		const isDuplicatedEmail = await ModelUser.findOne({ email });
		if (isDuplicatedEmail) throw new GraphQLError(Errors.duplicatedUser + ': Email is already in use');

		await ModelUser.create({ email, password });

		return { message: Success.newUser + `: A new user was created` };
	}

	async login({ login }: ILogin) {
		const hasEmptyValues = checkValues(login);
		if (hasEmptyValues) throw new GraphQLError(Errors.emptyVariable + ': ' + hasEmptyValues);

		const { email, password } = login;

		const user = await ModelUser.findOne({ email });
		if (!user) throw new GraphQLError(Errors.authentication + ': Email/Password is wrong');

		const isSamePassword = checkPassword(password, user.password);
		if (!isSamePassword) throw new GraphQLError(Errors.authentication + ': Email/Password is wrong');

		const token = generateToken(email);

		return { message: Success.login, token };
	}
}
