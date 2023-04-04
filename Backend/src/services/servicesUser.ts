import { GraphQLError } from 'graphql';
import { IGetUser } from '../interfaces/interfacesUser';
import { ModelUser } from '../models/modelUser';
import { Errors } from '../utils/errors';

export class ServicesUser {
	async getUser({ email }: IGetUser) {
		if (!email) throw new GraphQLError(Errors.emptyVariable + ': email was not provided');

		const user = await ModelUser.findOne({ email });
		if (!user) throw new GraphQLError(Errors.userNotFound + ': user not found');

		return { email: user.email, password: '' };
	}
}
