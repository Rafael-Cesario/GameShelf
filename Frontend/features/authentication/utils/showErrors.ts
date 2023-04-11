import produce from 'immer';
import { ICreateAccount, FormValues } from '../interfaces/forms';

export const showErrors = (errors: ICreateAccount, formValues: FormValues, setFormValues: (newState: FormValues) => void) => {
	const newState = produce(formValues, (draft) => {
		draft.errors = errors;
	});

	setFormValues(newState);
};
