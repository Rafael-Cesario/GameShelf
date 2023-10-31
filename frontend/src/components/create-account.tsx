import { StyledForm } from "./styles/styled-form";

interface Props {
	props: {
		setFormName: React.Dispatch<React.SetStateAction<"login" | "create">>;
	};
}

export const CreateAccount = ({ props: { setFormName } }: Props) => {
	return (
		<>
			<h1 className="title">Criar conta</h1>



			<button className="change-form" onClick={() => setFormName("login")}>
				Já tem uma conta? Clique aqui para fazer login.
			</button>
		</>
	);
};
