import { StyledForm } from "./styles/styledForm";

export const Login = () => {
	return (
		<StyledForm>
			<h1 className="title">Login</h1>

			<form>
				<input type="text" placeholder="Email" />
				<input type="text" placeholder="Senha" />
				<button>Entrar</button>
			</form>

			<button className="change-form">Não tem uma conta? Clique aqui para criar.</button>
		</StyledForm>
	);
};
