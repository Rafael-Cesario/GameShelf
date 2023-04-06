import { StyledForm } from './styles/styledForm';

export const CreateAccount = () => {
	return (
		<StyledForm>
			<h1 className="title">Criar conta</h1>

			<form>
				<input type="text" placeholder="Email" />
				<input type="text" placeholder="Nome" />
				<input type="text" placeholder="Senha" />
				<input type="text" placeholder="Confirme sua senha" />
				<button>Entrar</button>
			</form>

			<button className="change-form">Voltar para a tela de login</button>
		</StyledForm>
	);
};
