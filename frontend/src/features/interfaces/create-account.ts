export interface CreateAccountProps {
	props: {
		setFormName: React.Dispatch<React.SetStateAction<"login" | "create">>;
	};
}

export interface AccountFormFields {
	email: string;
	name: string;
	password: string;
	passwordCheck: string;
}
