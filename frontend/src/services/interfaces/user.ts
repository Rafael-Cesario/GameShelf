export interface User {
	id: string;
	email: string;
	name: string;
}

export interface CreateUserInput {
	createUserData: {
		email: string;
		name: string;
		password: string;
	};
}

export interface CreateUserResponse {
	createUser: User;
}

export interface LoginInput {
	loginData: {
		email: string;
		password: string;
	};
}
