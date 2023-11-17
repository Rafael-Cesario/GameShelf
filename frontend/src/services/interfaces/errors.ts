interface Errors {
	default: string;

	user: {
		// Email is already in use
		duplicated: string;
		// Email/Password is wrong
		unauthorized: string;
	};
}

export const serviceErrors: Errors = {
	default: "Um erro inesperado ocorreu, por favor recarregue a página.",

	user: {
		duplicated: "Este email já está em uso.",
		unauthorized: "Email ou senha incorretos.",
	},
};
