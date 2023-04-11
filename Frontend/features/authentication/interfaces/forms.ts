export type CreateAccountFields = keyof ICreateAccount;
export type LoginFields = keyof ILogin;
export type FormNames = 'login' | 'create';

export interface IFormProps {
	props: {
		setFormName: (formName: FormNames) => void;
	};
}

export interface ICreateAccount {
	email: string;
	name: string;
	password: string;
	confirmPassword: string;
}

export interface ILogin {
	email: string;
	password: string;
}

export interface FormValues {
	fields: ICreateAccount;
	errors: ICreateAccount;
}
