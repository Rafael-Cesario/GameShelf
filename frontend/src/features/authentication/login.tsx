interface Props {
	props: {
		setCurrentForm(state: "login" | "create"): void;
	};
}

export const Login = ({ props: { setCurrentForm } }: Props) => {
	return (
		<>
			<h1 className="title">Entrar</h1>

			<button data-cy="change-form" className="set-form" onClick={() => setCurrentForm("create")} type="button">
				Ainda não tem uma conta? Clique aqui para criar.
			</button>
		</>
	);
};
