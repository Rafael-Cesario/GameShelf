import produce from 'immer';
import { Validations } from '../../utils/validations';
import { IFieldProps } from './interfaces/fieldProps';
import { CreateAccountFields } from '../../interfaces/forms';

export const Field = ({ props: { name, type, placeholder, formValues, setFormValues } }: IFieldProps) => {
	const changeValue = (newValue: string, fieldName: CreateAccountFields) => {
		const validations = new Validations();

		const newState = produce(formValues, (draft) => {
			const invalidField = validations[fieldName](newValue, formValues.fields.password);

			if (invalidField) draft.errors[fieldName] = invalidField;
			else draft.errors[fieldName] = '';

			draft.fields[fieldName] = newValue;
		});

		setFormValues(newState);
	};

	return (
		<div className="field">
			<label htmlFor={name}>{formValues.errors[name as keyof typeof formValues.errors]}</label>
			<input
				type={type}
				id={name}
				placeholder={placeholder}
				value={formValues.fields[name as keyof typeof formValues.fields]}
				onChange={(e) => changeValue(e.target.value, name)}
			/>
		</div>
	);
};
