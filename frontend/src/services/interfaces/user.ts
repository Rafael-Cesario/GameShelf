export interface CreateUserInput {
	createUserData: {
		email: string;
		password: string;
	};
}

export interface CreateUserResponse {
	createUser: string;
}

export interface LoginInput {
	loginData: {
		email: string;
		password: string;
	};
}

export interface LoginResponse {
	login: {
		id: string;
		email: string;
		token: string;
	};
}
