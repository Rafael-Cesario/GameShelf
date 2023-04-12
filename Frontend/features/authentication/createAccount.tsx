import produce from 'immer';
import { Validations } from './utils/validations';
import { StyledForm } from './styles/styledForm';
import { useState } from 'react';
import { useQueriesUser } from './hooks/useQueriesUser';
import { Loading } from '@/components/loading';
import { useNotification } from '@/utils/useNotification';
import { CreateAccountFields, ICreateAccount, IFormProps } from './interfaces/forms';
import { Field } from './field';

export const CreateAccount = ({ props: { setFormName } }: IFormProps) => {
	const { requestCreateUser, loadingCreateUser } = useQueriesUser();
	const { sendNotification } = useNotification();

	const defaultValues: ICreateAccount = { email: '', name: '', password: '', confirmPassword: '' };
	const [formValues, setFormValues] = useState({
		fields: defaultValues,
		errors: defaultValues,
	});

	const changeValue = (newValue: string, fieldName: string) => {
		const validations = new Validations();
		type FieldName = keyof typeof validations;

		const newState = produce(formValues, (draft) => {
			const invalidField = validations[fieldName as FieldName](newValue, formValues.fields.password);

			if (invalidField) draft.errors[fieldName as FieldName] = invalidField;
			else draft.errors[fieldName as FieldName] = '';

			draft.fields[fieldName as FieldName] = newValue;
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

	const showErrors = (errors: ICreateAccount) => {
		const newState = produce(formValues, (draft) => {
			draft.errors = errors;
		});

		setFormValues(newState);
	};

	const validateFields = () => {
		const validations = new Validations();
		const entries = Object.entries(formValues.fields);
		const errors: ICreateAccount = { email: '', name: '', password: '', confirmPassword: '' };
		let hasError = false;

		entries.forEach(([key, value]) => {
			const invalidField = validations[key as CreateAccountFields](value, formValues.fields.password);

			if (invalidField) {
				hasError = true;
				errors[key as CreateAccountFields] = invalidField;
			}
		});

		return { errors, hasError };
	};

	const createAccount = async (e: React.FormEvent) => {
		e.preventDefault();

		const { hasError, errors } = validateFields();
		if (hasError) return showErrors(errors);

		const { email, password } = formValues.fields;
		const { error, data } = await requestCreateUser({ email, password });
		if (error) return sendNotification('Erro', error);

		setFormName('login');
		sendNotification('Sucesso', data!);
		clearInputs();
	};

	return (
		<StyledForm>
			{loadingCreateUser && <Loading />}
			<h1 role="title" className="title">
				Criar conta
			</h1>

			<form onSubmit={(e) => createAccount(e)}>
				<Field
					props={{
						name: 'email',
						type: 'text',
						placeholder: 'Email',
						error: formValues.errors.email,
						value: formValues.fields.email,
						changeValue,
					}}
				/>

				<Field
					props={{
						name: 'name',
						type: 'text',
						placeholder: 'Nome',
						error: formValues.errors.name,
						value: formValues.fields.name,
						changeValue,
					}}
				/>

				<Field
					props={{
						name: 'password',
						type: 'password',
						placeholder: 'Senha',
						error: formValues.errors.password,
						value: formValues.fields.password,
						changeValue,
					}}
				/>

				<Field
					props={{
						name: 'confirmPassword',
						type: 'password',
						placeholder: 'Confirme sua senha',
						error: formValues.errors.confirmPassword,
						value: formValues.fields.confirmPassword,
						changeValue,
					}}
				/>

				<button>Criar conta</button>
			</form>

			<button role="change-form" onClick={() => setFormName('login')} className="change-form">
				Voltar para a tela de login
			</button>
		</StyledForm>
	);
};
