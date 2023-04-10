import produce from 'immer';
import { FormNames } from '@/pages/authentication';
import { StyledForm } from './styles/styledForm';
import { useState } from 'react';
import { Validations } from '@/features/authentication/utils/validations';
import { useQueriesUser } from './hooks/useQueriesUser';

interface ICreateAccount {
	props: {
		setFormName: (formName: FormNames) => void;
	};
}

export const CreateAccount = ({ props: { setFormName } }: ICreateAccount) => {
	type FieldName = keyof typeof formValues.fields;
	type FormErrors = typeof formValues.errors;

	const validations = new Validations();

	const defaultValues = { email: '', name: '', password: '', confirmPassword: '' };
	const [formValues, setFormValues] = useState({
		fields: defaultValues,
		errors: defaultValues,
	});

	const { createUser, loading } = useQueriesUser();

	const showErrors = (errors: FormErrors) => {
		const newState = produce(formValues, (draft) => {
			draft.errors = errors;
		});

		setFormValues(newState);
	};

	const validateFields = () => {
		const fields = Object.entries(formValues.fields);
		const errors = { ...formValues.errors };
		let hasError = false;

		fields.forEach(([key, value]) => {
			const invalidField = validations[key as FieldName](value, formValues.fields.password);

			if (invalidField) {
				hasError = true;
				errors[key as FieldName] = invalidField;
			}
		});

		return { errors, hasError };
	};

	const changeValue = (newValue: string, fieldName: FieldName) => {
		const newState = produce(formValues, (draft) => {
			const invalidField = validations[fieldName](newValue, formValues.fields.password);

			if (invalidField) draft.errors[fieldName] = invalidField;
			else draft.errors[fieldName] = '';

			draft.fields[fieldName] = newValue;
		});

		setFormValues(newState);
	};

	const clearInputs = () => {
		setFormValues(
			produce(formValues, (draft) => {
				draft.fields = defaultValues;
			})
		);
	};

	const createAccount = async (e: React.FormEvent) => {
		e.preventDefault();

		const { hasError, errors } = validateFields();
		if (hasError) return showErrors(errors);

		const { email, password } = formValues.fields;
		const { error } = await createUser({ email, password });
		if (error) return console.log({ error });

		console.log('Conta criada com sucesso.');
		clearInputs();
	};

	return (
		<StyledForm>
			<h1 className="title">Criar conta</h1>

			<form onSubmit={(e) => createAccount(e)}>
				<div className="field">
					<label htmlFor="email">{formValues.errors.email}</label>
					<input type="text" id="email" placeholder="Email" value={formValues.fields.email} onChange={(e) => changeValue(e.target.value, 'email')} />
				</div>

				<div className="field">
					<label htmlFor="name">{formValues.errors.name}</label>
					<input type="text" id="name" placeholder="Nome" value={formValues.fields.name} onChange={(e) => changeValue(e.target.value, 'name')} />
				</div>

				<div className="field">
					<label htmlFor="password">{formValues.errors.password}</label>
					<input
						type="text"
						id="password"
						placeholder="Senha"
						value={formValues.fields.password}
						onChange={(e) => changeValue(e.target.value, 'password')}
					/>
				</div>

				<div className="field">
					<label htmlFor="confirmPassword">{formValues.errors.confirmPassword}</label>
					<input
						type="text"
						id="confirmPassword"
						placeholder="Confirme sua senha"
						value={formValues.fields.confirmPassword}
						onChange={(e) => changeValue(e.target.value, 'confirmPassword')}
					/>
				</div>

				{loading && <p>...</p>}
				<button>Criar conta</button>
			</form>

			<button onClick={() => setFormName('login')} className="change-form">
				Voltar para a tela de login
			</button>
		</StyledForm>
	);
};
