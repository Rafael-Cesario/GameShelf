"use client";
import { useState } from "react";
import { Field } from "./components/field";
import { AccountFormFields, CreateAccountProps } from "./interfaces/create-account";
import { produce } from "immer";
import { validations } from "@/utils/validations";

export const CreateAccount = ({ props: { setFormName } }: CreateAccountProps) => {
	const defaultFields: AccountFormFields = { email: "", password: "", passwordCheck: "" };
	const [formValues, setFormValues] = useState(defaultFields);
	const [formErrors, setFormErrors] = useState(defaultFields);

	const onChange = (field: keyof AccountFormFields, value: string) => {
		updateValue(field, value);
		validateField(field, value);
	};

	const updateValue = (field: keyof AccountFormFields, value: string) => {
		const newState = produce(formValues, (draft) => {
			draft[field] = value;
		});

		setFormValues(newState);
	};

	const validateField = (field: keyof AccountFormFields, value: string) => {
		const error = validations[field](value, formValues.password);

		const newState = produce(formErrors, (draft) => {
			draft[field] = error;
		});

		setFormErrors(newState);
	};

	return (
		<>
			<h1 className="title">Criar conta</h1>

			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
				className="field-container">
				<Field props={{ error: formErrors.email, field: "email", labelText: "Email", onChange, placeholder: "Email", type: "text" }} />
				<Field props={{ error: formErrors.password, field: "password", labelText: "Senha", onChange, placeholder: "Senha", type: "password" }} />
				<Field props={{ error: formErrors.passwordCheck, field: "passwordCheck", labelText: "Confirmar senha", onChange, placeholder: "Senha", type: "password" }} />
				<button className="submit">Criar conta</button>
			</form>

			<button className="change-form" onClick={() => setFormName("login")}>
				Já tem uma conta? Clique aqui para fazer login.
			</button>
		</>
	);
};
