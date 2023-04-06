import { FormNames } from '@/pages/authentication';
import { StyledForm } from './styles/styledForm';

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
				<input type="text" placeholder="Email" />
				<input type="text" placeholder="Nome" />
				<input type="text" placeholder="Senha" />
				<input type="text" placeholder="Confirme sua senha" />
				<button>Criar conta</button>
			</form>

			<button onClick={() => setFormName('login')} className="change-form">
				Voltar para a tela de login
			</button>
		</StyledForm>
	);
};
