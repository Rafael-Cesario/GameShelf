export interface IUser {
	email: string;
	password: string;
}

export interface IGetUser {
	email: string;
}

export interface ICreateUser {
	createUser: IUser;
}

export interface ILogin {
	login: IUser;
}

export interface IValidateToken {
	token: string;
}

export interface ResponseCreateUser {
	createUser: { message: string };
}

export interface ResponseGetUser {
	getUser: { email: string; password: string };
}

export interface ResponseLogin {
	login: { message: string; token: string };
}

export interface ResponseValidateToken {
	validateToken: { message: string };
}