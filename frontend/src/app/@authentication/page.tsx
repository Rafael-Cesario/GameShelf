"use client";

import { TextField } from "@/features/authentication/components/text-field";
import { AuthenticationStyled } from "@/features/authentication/styles/authentication-styled";
import { checkEmptyValues } from "@/utils/check-empty-values";
import { validations } from "@/utils/validations";
import { produce } from "immer";
import { useState } from "react";

export default function Authentication() {
	const defaultData = { email: "", password: "", passwordCheck: "" };
	const [currentForm, setCurrentForm] = useState<"login" | "create">("login");
	const [formData, setFormData] = useState(defaultData);
	const [formErrors, setFormErrors] = useState(defaultData);

	const updateFieldValue = (fieldName: keyof typeof formData, value: string) => {
		const state = produce(formData, (draft) => {
			draft[fieldName] = value;
		});

		setFormData(state);
	};

	const validateField = (fieldName: keyof typeof formData, value: string) => {
		const error = validations[fieldName](value, formData.password);

		const state = produce(formErrors, (draft) => {
			draft[fieldName] = error;
		});

		setFormErrors(state);
	};

	const createUser = () => {
		const { hasEmptyValues, emptyValues } = checkEmptyValues(formData);
		if (hasEmptyValues) return setFormErrors({ ...formErrors, ...emptyValues });

		console.log({ fields: formData });
	};

	return (
		<AuthenticationStyled>
			<h1 className="title">Criar sua conta</h1>

			<form
				className="form"
				onSubmit={(e) => {
					e.preventDefault();
					createUser();
				}}>
				<TextField
					props={{
						value: formData.email,
						error: formErrors.email,
						fieldName: "email",
						placeholder: "Digite seu email",
						label: "Email",
						onChange: (value: string) => {
							updateFieldValue("email", value);
							validateField("email", value);
						},
					}}
				/>

				<TextField
					props={{
						value: formData.password,
						error: formErrors.password,
						fieldName: "password",
						placeholder: "Digite sua senha",
						label: "Senha",
						onChange: (value: string) => {
							updateFieldValue("password", value);
							validateField("password", value);
						},
					}}
				/>

				<TextField
					props={{
						value: formData.passwordCheck,
						error: formErrors.passwordCheck,
						fieldName: "password-check",
						placeholder: "Digite sua senha",
						label: "Senha",
						onChange: (value: string) => {
							updateFieldValue("passwordCheck", value);
							validateField("passwordCheck", value);
						},
					}}
				/>

				<div className="button-container">
					<button className="submit">Entrar</button>

					<button className="set-form" onClick={() => setCurrentForm("login")} type="button">
						Já tem uma conta? Clique aqui para fazer login.
					</button>
				</div>
			</form>
		</AuthenticationStyled>
	);
}
