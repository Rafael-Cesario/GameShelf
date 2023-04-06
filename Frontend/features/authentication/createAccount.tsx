import { FormNames } from '@/pages/authentication';
import { StyledForm } from './styles/styledForm';
import { Input } from './inputs';

interface Props {
	props: {
		setFormName: (formName: FormNames) => void;
	};
}

export const CreateAccount = ({ props: { setFormName } }: Props) => {
	return (
		<StyledForm>
			<h1 className="title">Criar conta</h1>

			<form>
				<Input props={{ placeHolder: 'Email', type: 'text' }} />
				<Input props={{ placeHolder: 'Nome', type: 'text' }} />
				<Input props={{ placeHolder: 'Senha', type: 'password' }} />
				<Input props={{ placeHolder: 'Confirme sua senha', type: 'password' }} />
				<button>Criar conta</button>
			</form>

			<button onClick={() => setFormName('login')} className="change-form">
				Voltar para a tela de login
			</button>
		</StyledForm>
	);
};
