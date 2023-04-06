import { useState } from 'react';
import { StyledField } from './styles/styledField';

interface Props {
	props: {
		fieldName: string;
		type: string;
		placeHolder: string;
		formValues: { errors: object; fields: object };
		setFormValues: (newValues: { errors: object; fields: object }) => void;
	};
}

export const Input = ({ props: { type, placeHolder, formValues, setFormValues, fieldName } }: Props) => {
	return (
		<StyledField>
			<span>{formValues.errors[fieldName as keyof typeof formValues.errors]}</span>
			<input
				type={type}
				placeholder={placeHolder}
				value={formValues.fields[fieldName as keyof typeof formValues.fields]}
				onChange={(e) => setFormValues({ ...formValues, [fieldName]: e.target.value })}
			/>
		</StyledField>
	);
};
