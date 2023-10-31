export interface LoginProps {
	props: {
		setFormName: React.Dispatch<React.SetStateAction<"login" | "create">>;
	};
}

export interface LoginFormFields {
	email: string;
	password: string;
}
