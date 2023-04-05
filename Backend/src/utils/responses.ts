import { IErrors, ISuccess } from '../interfaces/interfaceResponses';

export const Errors: IErrors = {
	userNotFound: 'userNotFound',
	emptyVariable: 'emptyVarialbe',
	duplicatedUser: 'duplicatedUser',
	authentication: 'authentication',
};

export const Success: ISuccess = {
	newUser: 'newUser',
	login: 'login: Everything is right, welcome back',
};
