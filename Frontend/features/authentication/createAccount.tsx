import { validateFields } from './utils/validateFields';
import { StyledForm } from './styles/styledForm';
import { useState } from 'react';
import { useQueriesUser } from './hooks/useQueriesUser';
import { Loading } from '@/components/loading';
import { useNotification } from '@/utils/useNotification';
import { ICreateAccount, IFormProps } from './interfaces/forms';
import { Field } from './field';
import { showErrors } from './utils/showErrors';
import { clearInputs } from './utils/clearInputs';
import { Validations } from './utils/validations';
import produce from 'immer';

export const CreateAccount = ({ props: { setFormName } }: IFormProps) => {
	const { requestCreateUser, loadingCreateUser } = useQueriesUser();
	const { sendNotification } = useNotification();

	const defaultValues: ICreateAccount = { email: '', name: '', password: '', confirmPassword: '' };
	const [formValues, setFormValues] = useState({
		fields: defaultValues,
		errors: defaultValues,
	});

	const createAccount = async (e: React.FormEvent) => {
		e.preventDefault();

		const { hasError, errors } = validateFields(formValues.fields);
		if (hasError) return showErrors(errors, formValues, setFormValues);

		const { email, password } = formValues.fields;
		const { error, data } = await requestCreateUser({ email, password });
		if (error) return sendNotification('Erro', error);

		setFormName('login');
		sendNotification('Sucesso', data!);
		clearInputs(formValues, setFormValues, defaultValues);
	};

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

	return (
		<StyledForm>
			{loadingCreateUser && <Loading />}
			<h1 className="title">Criar conta</h1>

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

			<button onClick={() => setFormName('login')} className="change-form">
				Voltar para a tela de login
			</button>
		</StyledForm>
	);
};
