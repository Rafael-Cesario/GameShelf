import { CreateAccountFields, FormValues } from '@/features/authentication/interfaces/forms';

export interface IFieldProps {
	props: {
		name: string;
		type: string;
		placeholder: string;
		error: string;
		value: string;
		changeValue: (newValue: string, name: string) => void;
	};
}
