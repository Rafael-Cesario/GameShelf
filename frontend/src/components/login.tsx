import { useState } from "react";
import { Field } from "./field";
import { produce } from "immer";
import { LoginFormFields, LoginProps } from "./interfaces/login";

export const Login = ({ props: { setFormName } }: LoginProps) => {
	const defaultFields: LoginFormFields = { email: "", password: "" };
	const [fields, setFields] = useState(defaultFields);
	const [formErrors, setFormErrors] = useState(defaultFields);

	const onChange = (field: keyof LoginFormFields, value: string) => {
		const newState = produce(fields, (draft) => {
			draft[field] = value;
		});

		console.log({ newState });
		setFields(newState);
	};

	// todo > submit
	// Check for empty values
	// Check for errors

	return (
		<>
			<h1 className="title">Login</h1>

			<form className="field-container">
				<Field props={{ field: "email", type: "text", labelText: "Email", placeholder: "Email", onChange, error: formErrors.email }} />
				<Field props={{ field: "password", type: "password", labelText: "Senha", placeholder: "Senha", onChange, error: formErrors.password }} />
			</form>

			<button className="change-form" onClick={() => setFormName("create")}>
				Não tem uma conta? Clique aqui para criar uma.
			</button>
		</>
	);
};
