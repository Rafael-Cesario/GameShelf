"use client";

import { Field } from "@/features/authentication/components/field";
import { AuthenticationStyled } from "@/features/authentication/styles/authentication-styled";
import { CreateUserInput, CreateUserResponse } from "@/services/interfaces/user";
import { userQueries } from "@/services/queries/user";
import { checkEmptyValues } from "@/utils/check-empty-values";
import { validations } from "@/utils/validations";
import { useMutation } from "@apollo/client";
import { produce } from "immer";
import { useState } from "react";

export default function Authentication() {
	const defaultData = { email: "", password: "", passwordCheck: "" };
	const [currentForm, setCurrentForm] = useState<"login" | "create">("login");
	const [formData, setFormData] = useState(defaultData);
	const [formErrors, setFormErrors] = useState(defaultData);

	// loading button
	const [createUserMutation, { loading }] = useMutation<CreateUserResponse, CreateUserInput>(userQueries.CREATE_USER);

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

	const createUser = async () => {
		const { hasEmptyValues, emptyValues } = checkEmptyValues(formData);
		if (hasEmptyValues) return setFormErrors({ ...formErrors, ...emptyValues });

		try {
			const { email, password } = formData;
			const { data } = await createUserMutation({ variables: { createUserData: { email, password } } });
			console.log({ data });
			// Reset formData
			// change current form to login
			// notification
		} catch (error: any) {
			console.log(error.message);
			// catch errors
		}
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
				<Field
					props={{
						value: formData.email,
						error: formErrors.email,
						fieldName: "email",
						placeholder: "Digite seu email",
						label: "Email",
						type: "text",
						onChange: (value: string) => {
							updateFieldValue("email", value);
							validateField("email", value);
						},
					}}
				/>

				<Field
					props={{
						value: formData.password,
						error: formErrors.password,
						fieldName: "password",
						placeholder: "Digite sua senha",
						label: "Senha",
						type: "password",
						onChange: (value: string) => {
							updateFieldValue("password", value);
							validateField("password", value);
						},
					}}
				/>

				<Field
					props={{
						value: formData.passwordCheck,
						error: formErrors.passwordCheck,
						fieldName: "password-check",
						placeholder: "Digite sua senha",
						label: "Confirme sua senha",
						type: "password",
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
