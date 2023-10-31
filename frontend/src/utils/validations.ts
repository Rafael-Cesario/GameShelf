class Validations {
	email(value: string): string {
		const errorText = "Seu email não parece valido";
		const [user, domain] = value.split("@");

		if (!value.includes("@")) return errorText;
		if (!user || !domain) return errorText;
		if (!/\.com/.test(domain)) return errorText;
		return "";
	}

	password(value: string): string {
		if (value.length < 10) return "Sua senha deve conter no mínimo 10 caracteres";
		if (!/[0-9]/.test(value)) return "Sua senha deve conter números";
		if (!/[A-Z]/.test(value)) return "Sua senha deve conter ao menos uma letra maiúscula";
		if (!/[a-z]/.test(value)) return "Sua senha deve conter ao menos uma letra minúscula";
		return "";
	}
}

export const validations = new Validations();
