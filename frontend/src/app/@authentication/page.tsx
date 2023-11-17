"use client";

import { AuthenticationStyled } from "@/features/authentication/styles/authentication-styled";
import { useState } from "react";
import { Notification } from "@/components/notification";
import { CreateAccount } from "@/features/authentication/create-account";
import { Login } from "@/features/authentication/login";

export default function Authentication() {
	const [currentForm, setCurrentForm] = useState<"login" | "create">("login");

	return (
		<AuthenticationStyled>
			<Notification />
			{currentForm === "create" && <CreateAccount props={{ setCurrentForm }} />}
			{currentForm === "login" && <Login props={{ setCurrentForm }} />}
		</AuthenticationStyled>
	);
}
