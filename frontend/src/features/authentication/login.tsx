"use client";
import { useState } from "react";
import { Field } from "./components/field";
import { produce } from "immer";
import { checkEmptyValues } from "@/utils/check-empty-values";
import { useMutation } from "@apollo/client";
import { userQueries } from "@/services/queries/user";
import { LoginInput, LoginResponse } from "@/services/interfaces/user";
import { SetCookies } from "@/app/api/cookies/route";

interface Props {
	props: {
		setCurrentForm(state: "login" | "create"): void;
	};
}

export const Login = ({ props: { setCurrentForm } }: Props) => {
	const defaultValues = { email: "", password: "" };
	const [formData, setFormData] = useState(defaultValues);
	const [formErrors, setFormErrors] = useState(defaultValues);

	const [loginMutation] = useMutation<LoginResponse, LoginInput>(userQueries.LOGIN);

	const updateFieldValue = (fieldName: keyof typeof formData, value: string) => {
		const state = produce(formData, (draft) => {
			draft[fieldName] = value;
		});

		setFormData(state);
	};

	const login = async () => {
		const { hasEmptyValues, emptyValues } = checkEmptyValues(formData);
		if (hasEmptyValues) return setFormErrors({ ...formErrors, ...emptyValues });

		try {
			const { data } = await loginMutation({ variables: { loginData: { ...formData } } });
			if (!data) throw new Error("Data is undefined");

			const cookiesData: SetCookies = { name: "user", value: { ...data.login } };

			await fetch("/api/cookies", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(cookiesData),
			});

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.log(error.message);
		}

		console.log("Login");
	};

	return (
		<>
			<h1 className="title">Entrar</h1>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					login();
				}}>
				<Field
					props={{
						fieldName: "email",
						label: "Email",
						placeholder: "Digite seu email",
						type: "text",
						value: formData.email,
						error: formErrors.email,
						onChange: (value: string) => updateFieldValue("email", value),
					}}
				/>

				<Field
					props={{
						error: formErrors.password,
						fieldName: "password",
						label: "Senha",
						onChange: (value: string) => updateFieldValue("password", value),
						placeholder: "Digite sua senha",
						type: "password",
						value: formData.password,
					}}
				/>

				<div className="button-container">
					<button className="submit">Entrar</button>

					<button data-cy="change-form" className="set-form" onClick={() => setCurrentForm("create")} type="button">
						Ainda não tem uma conta? Clique aqui para criar.
					</button>
				</div>
			</form>
		</>
	);
};
