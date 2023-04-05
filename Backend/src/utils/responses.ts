import { IErrors, ISuccess } from '../interfaces/interfaceResponses';

export const Errors: IErrors = {
	userNotFound: 'userNotFound: User not found.',
	emptyVariable: 'emptyVarialbe: ',
	duplicatedUser: 'duplicatedUser: This email is already in use.',
	authentication: 'authentication: Email/Password is wrong.',
};

export const Success: ISuccess = {
	newUser: 'newUser: A new user was created',
	login: 'login: Everything is right, welcome back',
};
