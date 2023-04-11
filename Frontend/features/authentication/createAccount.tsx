import produce from 'immer';
import { StyledForm } from './styles/styledForm';
import { useState } from 'react';
import { Validations } from '@/features/authentication/utils/validations';
import { useQueriesUser } from './hooks/useQueriesUser';
import { Loading } from '@/components/loading';
import { useNotification } from '@/utils/useNotification';
import { ICreateAccount, IFormProps } from './interfaces/forms';
import { Field } from './components/createAccount/field';

export const CreateAccount = ({ props: { setFormName } }: IFormProps) => {
	type FieldName = keyof typeof formValues.fields;
	type FormErrors = typeof formValues.errors;

	const defaultValues: ICreateAccount = { email: '', name: '', password: '', confirmPassword: '' };
	const [formValues, setFormValues] = useState({
		fields: defaultValues,
		errors: defaultValues,
	});

	const { createUser, loading } = useQueriesUser();
	const { sendNotification } = useNotification();

	const showErrors = (errors: FormErrors) => {
		const newState = produce(formValues, (draft) => {
			draft.errors = errors;
		});

		setFormValues(newState);
	};

	const validateFields = () => {
		const validations = new Validations();
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
		const { error, data } = await createUser({ email, password });
		if (error) return sendNotification('Erro', error);

		sendNotification('Sucesso', data!);
		setFormName('login');
		clearInputs();
	};

	return (
		<StyledForm>
			{loading && <Loading />}
			<h1 className="title">Criar conta</h1>

			<form onSubmit={(e) => createAccount(e)}>
				<Field props={{ name: 'email', type: 'text', placeholder: 'Email', formValues, setFormValues }} />
				<Field props={{ name: 'name', type: 'text', placeholder: 'Nome', formValues, setFormValues }} />
				<Field props={{ name: 'password', type: 'password', placeholder: 'Senha', formValues, setFormValues }} />
				<Field props={{ name: 'confirmPassword', type: 'password', placeholder: 'Confirme sua senha', formValues, setFormValues }} />

				<button>Criar conta</button>
			</form>

			<button onClick={() => setFormName('login')} className="change-form">
				Voltar para a tela de login
			</button>
		</StyledForm>
	);
};
