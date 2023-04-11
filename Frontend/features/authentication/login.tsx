import { StyledForm } from './styles/styledForm';
import { useState } from 'react';
import produce from 'immer';
import { IFormProps, LoginFields } from './interfaces/forms';
import { Field } from './field';

export const Login = ({ props: { setFormName } }: IFormProps) => {
	const defaultValues = { email: '', password: '' };
	const [formValues, setFormValues] = useState({ fields: defaultValues, errors: defaultValues });

	const changeValue = (newValue: string, fieldName: string) => {
		const newState = produce(formValues, (draft) => {
			if (!newValue) draft.errors[fieldName as LoginFields] = 'Este campo não pode ficar vazio';
			else draft.errors[fieldName as LoginFields] = '';

			draft.fields[fieldName as LoginFields] = newValue;
		});

		setFormValues(newState);
	};

	return (
		<StyledForm>
			<h1 className="title">Login</h1>

			<form>
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
						name: 'password',
						type: 'password',
						placeholder: 'Senha',
						error: formValues.errors.password,
						value: formValues.fields.password,
						changeValue,
					}}
				/>

				<button>Entrar</button>
			</form>

			<button onClick={() => setFormName('create')} className="change-form">
				Não tem uma conta? Clique aqui para criar.
			</button>
		</StyledForm>
	);
};
