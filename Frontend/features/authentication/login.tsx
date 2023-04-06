import { FormNames } from '@/pages/authentication';
import { StyledForm } from './styles/styledForm';
import { Input } from './inputs';
import { useState } from 'react';

interface Props {
	props: {
		setFormName: (formName: FormNames) => void;
	};
}

export const Login = ({ props: { setFormName } }: Props) => {
	const [formValues, setFormValues] = useState<{ errors: object; fields: object }>({
		fields: { email: '', password: '' },
		errors: { email: '', password: '' },
	});

	return (
		<StyledForm>
			<h1 className="title">Login</h1>

			<form>
				<Input props={{ type: 'text', placeHolder: 'Email', fieldName: 'email', formValues, setFormValues }} />
				<Input props={{ type: 'password', placeHolder: 'Senha', fieldName: 'password', formValues, setFormValues }} />
				<button>Entrar</button>
			</form>

			<button onClick={() => setFormName('create')} className="change-form">
				Não tem uma conta? Clique aqui para criar.
			</button>
		</StyledForm>
	);
};
