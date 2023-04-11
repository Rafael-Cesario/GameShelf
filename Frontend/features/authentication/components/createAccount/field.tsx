export const Field = () => {
	const changeValue = (newValue: string, fieldName: FieldName) => {
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
			<label htmlFor="email">{formValues.errors.email}</label>
			<input type="text" id="email" placeholder="Email" value={formValues.fields.email} onChange={(e) => changeValue(e.target.value, 'email')} />
		</div>
	);
};
