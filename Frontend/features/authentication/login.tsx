import { FormNames } from '@/pages/authentication';
import { StyledForm } from './styles/styledForm';
import { useState } from 'react';
import produce from 'immer';

interface Props {
	props: {
		setFormName: (formName: FormNames) => void;
	};
}

export const Login = ({ props: { setFormName } }: Props) => {
	type FieldName = keyof typeof formValues.fields;

	const defaultValues = { email: '', password: '' };
	const [formValues, setFormValues] = useState({ fields: defaultValues, errors: defaultValues });

	const changeValue = (newValue: string, fieldName: FieldName) => {
		const newState = produce(formValues, (draft) => {
			if (!newValue) draft.errors[fieldName] = 'Este campo não pode ficar vazio';
			else draft.errors[fieldName] = '';

			draft.fields[fieldName] = newValue;
		});

		setFormValues(newState);
	};

	return (
		<StyledForm>
			<h1 className="title">Login</h1>

			<form>
				<div className="field">
					<label htmlFor="email">{formValues.errors.email}</label>
					<input type="text" id="email" placeholder="Email" value={formValues.fields.email} onChange={(e) => changeValue(e.target.value, 'email')} />
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

				<button>Entrar</button>
			</form>

			<button onClick={() => setFormName('create')} className="change-form">
				Não tem uma conta? Clique aqui para criar.
			</button>
		</StyledForm>
	);
};
