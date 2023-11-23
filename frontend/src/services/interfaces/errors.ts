interface Errors {
	default: string;

	user: {
		// Email is already in use
		duplicated: string;
		// Email/Password is wrong
		unauthorized: string;
	};

	collection: {
		// A collection with the same name already exist.
		duplicated: string;
	};

	game: {
		duplicated: string;
	};
}

export const serviceErrors: Errors = {
	default: "Um erro inesperado ocorreu, por favor recarregue a página.",

	user: {
		duplicated: "Este email já está em uso.",
		unauthorized: "Email ou senha incorretos.",
	},

	collection: {
		duplicated: "Uma coleção com o mesmo nome já existe.",
	},

	game: {
		duplicated: "Parece que esse jogo já está salvo.",
	},
};
