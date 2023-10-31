export interface CreateAccountProps {
	props: {
		setFormName: React.Dispatch<React.SetStateAction<"login" | "create">>;
	};
}

export interface AccountFormFields {
	email: string;
	password: string;
	passwordCheck: string;
}
