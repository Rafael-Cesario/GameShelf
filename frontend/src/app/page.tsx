"use client";
import { CreateAccount } from "@/components/create-account";
import { Login } from "@/components/login";
import { StyledForm } from "@/components/styles/styled-form";
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
