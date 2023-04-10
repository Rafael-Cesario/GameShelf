export interface IErrors {
	emptyVariable: string;
	userNotFound: string;
	duplicatedUser: string;
	authentication: string;
}

export const Errors: IErrors = {
	userNotFound: 'userNotFound: User not found.',
	emptyVariable: 'emptyVariable: ',
	duplicatedUser: 'duplicatedUser: This email is already in use.',
	authentication: 'authentication: Email/Password is wrong.',
};

export interface ISuccess {
	newUser: string;
	login: string;
}

export const Success: ISuccess = {
	newUser: 'newUser: A new user was created',
	login: 'login: Everything is right, welcome back',
};
