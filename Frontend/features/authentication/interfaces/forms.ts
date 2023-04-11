export type CreateAccountFields = keyof ICreateAccount;
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
