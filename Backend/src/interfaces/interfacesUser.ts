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
