"use client";
import { useState } from "react";
import { Field } from "./components/field";
import { AccountFormFields, CreateAccountProps } from "./interfaces/create-account";
import { produce } from "immer";
import { validations } from "@/utils/validations";
import { useMutation } from "@apollo/client";
import { userQueries } from "@/services/queries/user";
import { CreateUserInput, CreateUserResponse } from "@/services/interfaces/user";
import { LoadingButton } from "./components/loading-button";
import { useDispatch } from "react-redux";
import { setNotificationError, setNotificationSuccess } from "@/context/notification-slice";
import { responseErrors } from "@/services/interfaces/errors";

export const CreateAccount = ({ props: { setFormName } }: CreateAccountProps) => {
	const defaultFields: AccountFormFields = { email: "", name: "", password: "", passwordCheck: "" };
	const [formValues, setFormValues] = useState({ ...defaultFields });
	const [formErrors, setFormErrors] = useState({ ...defaultFields });
	const [isFormValid, setIsFormValid] = useState(false);

	const [createUserMutation, { loading }] = useMutation<CreateUserResponse, CreateUserInput>(userQueries.CREATE_USER);
	const dispatch = useDispatch();

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
		const fieldError = validations[field](value, formValues.password);
		const newState = { ...formErrors, [field]: fieldError };
		const allErrors = Object.values(newState);
		const hasError = !!allErrors.join("");

		setIsFormValid(!hasError);
		setFormErrors(newState);
	};

	const checkEmptyValues = () => {
		const fields = Object.entries(formValues);
		const errors = formErrors;
		let hasEmptyValues = false;

		fields.forEach(([key, value]) => {
			if (!value) {
				errors[key as keyof AccountFormFields] = "Este campo não pode ficar vazio";
				hasEmptyValues = true;
			}
		});

		setFormErrors({ ...formErrors, ...errors });

		return hasEmptyValues;
	};

	const createAccount = async () => {
		const hasEmptyValues = checkEmptyValues();
		if (hasEmptyValues || !isFormValid) return;

		try {
			const { email, name, password } = formValues;
			const variables = { createUserData: { email, name, password } };
			await createUserMutation({ variables });

			dispatch(setNotificationSuccess({ message: `Boas vindas ${name[0].toUpperCase() + name.slice(1)}, sua conta foi criada e você já pode fazer login.` }));
			setFormValues(defaultFields);
			setFormName("login");
		} catch (error: any) {
			const [errorCode] = error.message.split(":");
			const message = responseErrors.user[errorCode as keyof typeof responseErrors.user] || responseErrors.default;
			dispatch(setNotificationError({ message }));
		}
	};

	return (
		<>
			<h1 className="title">Criar conta</h1>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					createAccount();
				}}
				className="field-container">
				<Field props={{ error: formErrors.email, field: "email", labelText: "Email", onChange, placeholder: "Email", type: "text" }} />
				<Field props={{ error: formErrors.name, field: "name", labelText: "Nome", onChange, placeholder: "Nome", type: "text" }} />
				<Field props={{ error: formErrors.password, field: "password", labelText: "Senha", onChange, placeholder: "Senha", type: "password" }} />
				<Field props={{ error: formErrors.passwordCheck, field: "passwordCheck", labelText: "Confirmar senha", onChange, placeholder: "Senha", type: "password" }} />

				{loading || <button className="submit">Criar conta</button>}
				{loading && <LoadingButton className="submit loading" />}
			</form>

			<button className="change-form" onClick={() => setFormName("login")}>
				Já tem uma conta? Clique aqui para fazer login.
			</button>
		</>
	);
};
