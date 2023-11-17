"use client";

import { setErrorNotification, setSuccessNotification } from "@/context/notification-slice";
import { Field } from "@/features/authentication/components/field";
import { AuthenticationStyled } from "@/features/authentication/styles/authentication-styled";
import { serviceErrors } from "@/services/interfaces/errors";
import { CreateUserInput, CreateUserResponse } from "@/services/interfaces/user";
import { userQueries } from "@/services/queries/user";
import { checkEmptyValues } from "@/utils/check-empty-values";
import { validations } from "@/utils/validations";
import { useMutation } from "@apollo/client";
import { produce } from "immer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Notification } from "@/components/notification";
import { LoadingButton } from "@/components/loading-button";

export default function Authentication() {
	const defaultData = { email: "", password: "", passwordCheck: "" };
	const [currentForm, setCurrentForm] = useState<"login" | "create">("login");
	const [formData, setFormData] = useState(defaultData);
	const [formErrors, setFormErrors] = useState(defaultData);

	const [createUserMutation, { loading }] = useMutation<CreateUserResponse, CreateUserInput>(userQueries.CREATE_USER);
	const dispatch = useDispatch();

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
			await createUserMutation({ variables: { createUserData: { email, password } } });

			setFormData(defaultData);
			setCurrentForm("login");
			dispatch(setSuccessNotification({ message: "Sua conta foi criada com sucesso, você já pode fazer login" }));
		} catch (error: any) {
			const [errorCode] = error.message.toLowerCase().split(":");
			const message = serviceErrors.user[errorCode as keyof typeof serviceErrors.user] || serviceErrors.default;
			dispatch(setErrorNotification({ message }));
		}
	};

	return (
		<AuthenticationStyled>
			<Notification />

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
					{loading || <button className="submit">Entrar</button>}
					{loading && <LoadingButton />}

					<button className="set-form" onClick={() => setCurrentForm("login")} type="button">
						Já tem uma conta? Clique aqui para fazer login.
					</button>
				</div>
			</form>
		</AuthenticationStyled>
	);
}
