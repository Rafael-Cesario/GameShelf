"use client";
import { Login } from "@/features/login";
import { CreateAccount } from "@/features/create-account";
import { StyledForm } from "@/features/styles/styled-form";
import { useState } from "react";

const Home = () => {
	const [formName, setFormName] = useState<"login" | "create">("login");

	return (
		<StyledForm>
			{formName === "login" && <Login props={{ setFormName }} />}
			{formName === "create" && <CreateAccount props={{ setFormName }} />}
		</StyledForm>
	);
};

export default Home;
