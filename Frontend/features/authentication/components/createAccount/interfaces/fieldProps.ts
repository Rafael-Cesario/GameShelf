import { CreateAccountFields, ICreateAccount } from '@/features/authentication/interfaces/forms';

interface FormValues {
	fields: ICreateAccount;
	errors: ICreateAccount;
}

export interface IFieldProps {
	props: {
		name: CreateAccountFields;
		type: string;
		placeholder: string;
		formValues: FormValues;
		setFormValues: (newState: FormValues) => void;
	};
}
