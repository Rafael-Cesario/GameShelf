import { GraphQLError } from 'graphql';
import { ICreateUser, IGetUser, ILogin, IValidateToken } from '../interfaces/IUsers';
import { ModelUser } from '../models/modelUser';
import { checkPassword } from '../utils/crypt';
import { searchForEmptyValues } from '../utils/emptyValues';
import { generateToken, verifyToken } from '../utils/token';
import { Errors, Success } from '../interfaces/IResponses';

export class ServicesUser {
	async getUser({ email }: IGetUser) {
		if (!email) throw new GraphQLError(Errors.emptyVariable + 'Email was not provided');

		const user = await ModelUser.findOne({ email });
		if (!user) throw new GraphQLError(Errors.userNotFound);

		return { email: user.email, password: '' };
	}

	async createUser({ createUser }: ICreateUser) {
		const hasEmptyValues = searchForEmptyValues(createUser);
		if (hasEmptyValues) throw new GraphQLError(Errors.emptyVariable + hasEmptyValues);

		const { email, password } = createUser;

		const isDuplicatedEmail = await ModelUser.findOne({ email });
		if (isDuplicatedEmail) throw new GraphQLError(Errors.duplicatedUser);

		await ModelUser.create({ email, password });

		return { message: Success.newUser };
	}

	async login({ login }: ILogin) {
		const hasEmptyValues = searchForEmptyValues(login);
		if (hasEmptyValues) throw new GraphQLError(Errors.emptyVariable + hasEmptyValues);

		const { email, password } = login;

		const user = await ModelUser.findOne({ email });
		if (!user) throw new GraphQLError(Errors.authentication);

		const isSamePassword = checkPassword(password, user.password);
		if (!isSamePassword) throw new GraphQLError(Errors.authentication);

		const token = generateToken(email);

		return { message: Success.login, token };
	}

	async validateToken({ token }: IValidateToken) {
		const isTokenValid = verifyToken(token);
		return { message: String(!!isTokenValid) };
	}
}
