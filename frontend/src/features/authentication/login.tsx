"use client";
import { useState } from "react";
import { Field } from "./components/field";
import { produce } from "immer";
import { checkEmptyValues } from "@/utils/check-empty-values";
import { useMutation } from "@apollo/client";
import { userQueries } from "@/services/queries/user";
import { LoginInput, LoginResponse } from "@/services/interfaces/user";
import { SetCookies } from "@/app/api/cookies/route";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/loading-button";
import { serviceErrors } from "@/services/interfaces/errors";
import { useDispatch } from "react-redux";
import { setErrorNotification } from "@/context/notification-slice";

interface Props {
	props: {
		setCurrentForm(state: "login" | "create"): void;
	};
}

export const Login = ({ props: { setCurrentForm } }: Props) => {
	const defaultValues = { email: "", password: "" };
	const [formData, setFormData] = useState(defaultValues);
	const [formErrors, setFormErrors] = useState(defaultValues);

	const [loginMutation, { loading }] = useMutation<LoginResponse, LoginInput>(userQueries.LOGIN);
	const dispatch = useDispatch();
	const router = useRouter();

	const updateFieldValue = (fieldName: keyof typeof formData, value: string) => {
		const state = produce(formData, (draft) => {
			draft[fieldName] = value;
		});

		setFormData(state);
	};

	const setCookies = async (cookiesData: SetCookies) => {
		await fetch("/api/cookies", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(cookiesData),
		});
	};

	const login = async () => {
		const { hasEmptyValues, emptyValues } = checkEmptyValues(formData);
		if (hasEmptyValues) return setFormErrors({ ...formErrors, ...emptyValues });

		try {
			const { data } = await loginMutation({ variables: { loginData: { ...formData } } });
			if (!data) throw new Error("No data received from the server");

			const cookiesData: SetCookies = { name: "user", value: { ...data.login } };
			setCookies(cookiesData);

			setFormData(defaultValues);
			router.refresh();
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			const [errorCode] = error.message.toLowerCase().split(":");
			const message = serviceErrors.user[errorCode as keyof typeof serviceErrors.user] || serviceErrors.default;
			dispatch(setErrorNotification({ message }));
		}
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
					{loading && <LoadingButton />}
					{loading || <button className="submit">Entrar</button>}

					<button data-cy="change-form" className="set-form" onClick={() => setCurrentForm("create")} type="button">
						Ainda não tem uma conta? Clique aqui para criar.
					</button>
				</div>
			</form>
		</>
	);
};
