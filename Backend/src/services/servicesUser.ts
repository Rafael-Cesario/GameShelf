import { GraphQLError } from 'graphql';
import { ICreateUser, IGetUser } from '../interfaces/interfacesUser';
import { ModelUser } from '../models/modelUser';
import { Errors, Success } from '../utils/responses';

export class ServicesUser {
	async getUser({ email }: IGetUser) {
		if (!email) throw new GraphQLError(Errors.emptyVariable + ': email was not provided');

		const user = await ModelUser.findOne({ email });
		if (!user) throw new GraphQLError(Errors.userNotFound + ': user not found');

		return { email: user.email, password: '' };
	}

	async createUser({ createUser: { email, password } }: ICreateUser) {
		if (!email) throw new GraphQLError(Errors.emptyVariable + ': Email was not provided');
		if (!password) throw new GraphQLError(Errors.emptyVariable + ': Password was not provided');

		const isDuplicatedEmail = await ModelUser.findOne({ email });
		if (isDuplicatedEmail) throw new GraphQLError(Errors.duplicated + ': Email is already in use');

		await ModelUser.create({ email, password });

		return { message: Success.newUser + `: A new user was created` };
	}
}
