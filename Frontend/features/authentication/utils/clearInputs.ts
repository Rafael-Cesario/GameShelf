import produce from 'immer';
import { FormValues, ICreateAccount } from '../interfaces/forms';

export const clearInputs = (formValues: FormValues, setFormValues: (newState: FormValues) => void, defaultValues: ICreateAccount) => {
	setFormValues(
		produce(formValues, (draft) => {
			draft.fields = defaultValues;
		})
	);
};
