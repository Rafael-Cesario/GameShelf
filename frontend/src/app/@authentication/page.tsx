"use client";

import { TextField } from "@/features/authentication/components/text-field";
import { AuthenticationStyled } from "@/features/authentication/styles/authentication-styled";
import { useState } from "react";

export default function Authentication() {
	const [currentForm, setCurrentForm] = useState<"login" | "create">("login");

	return (
		<AuthenticationStyled>
			<h1 className="title">Criar sua conta</h1>

			<form className="form">
				<TextField props={{ error: "Este campo não pode ficar vazio", fieldName: "email", placeholder: "Digite seu email", label: "Email" }} />
				<TextField props={{ error: "Este campo não pode ficar vazio", fieldName: "password", placeholder: "Digite sua senha", label: "Senha" }} />
				<TextField props={{ error: "Este campo não pode ficar vazio", fieldName: "password-check", placeholder: "Digite sua senha", label: "Senha" }} />

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
