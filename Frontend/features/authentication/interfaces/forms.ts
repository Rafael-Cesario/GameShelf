export type FormNames = 'login' | 'create';

export interface IFormProps {
	props: {
		setFormName: (formName: FormNames) => void;
	};
}
