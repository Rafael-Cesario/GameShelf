import { Field } from "./field";
import { StyledForm } from "./styles/styled-form";

interface Props {
	props: {
		setFormName: React.Dispatch<React.SetStateAction<"login" | "create">>;
	};
}

export const Login = ({ props: { setFormName } }: Props) => {
	return (
		<>
			<h1 className="title">Login</h1>

			<div className="field-container">
				<Field props={{ field: "email", type: "text", labelText: "Email", placeholder: "Email" }} />
				<Field props={{ field: "password", type: "password", labelText: "Senha", placeholder: "Senha" }} />
			</div>

			<button className="change-form" onClick={() => setFormName("create")}>
				Não tem uma conta? Clique aqui para criar uma.
			</button>
		</>
	);
};
