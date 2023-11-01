class Validations {
	email(value: string): string {
		const errorText = "Seu email não parece valido";
		const [user, domain] = value.split("@");

		if (!value) return "Este campo não pode ficar vazio";
		if (!value.includes("@")) return errorText;
		if (!user || !domain) return errorText;
		if (!/\.com/.test(domain)) return errorText;
		return "";
	}

	name(value: string): string {
		if (!value) return "Este campo não pode ficar vazio";
		if (value.length > 30) return "Seu nome é muito grande";
		return "";
	}

	password(value: string): string {
		if (!value) return "Este campo não pode ficar vazio";
		if (value.length < 10) return "Sua senha deve conter no mínimo 10 caracteres";
		if (!/[0-9]/.test(value)) return "Sua senha deve conter números";
		if (!/[A-Z]/.test(value)) return "Sua senha deve conter ao menos uma letra maiúscula";
		if (!/[a-z]/.test(value)) return "Sua senha deve conter ao menos uma letra minúscula";
		return "";
	}

	passwordCheck(value: string, password: string): string {
		if (!value) return "Este campo não pode ficar vazio";
		if (value !== password) return "Suas senhas devem ser iguais";
		return "";
	}
}

export const validations = new Validations();
