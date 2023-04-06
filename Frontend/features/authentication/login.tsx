import { FormNames } from '@/pages/authentication';
import { StyledForm } from './styles/styledForm';

interface Props {
	props: {
		setFormName: (formName: FormNames) => void;
	};
}

export const Login = ({ props: { setFormName } }: Props) => {
	return (
		<StyledForm>
			<h1 className="title">Login</h1>

			<form>
				<input type="text" placeholder="Email" />
				<input type="text" placeholder="Senha" />
				<button>Entrar</button>
			</form>

			<button onClick={() => setFormName('create')} className="change-form">
				Não tem uma conta? Clique aqui para criar.
			</button>
		</StyledForm>
	);
};
