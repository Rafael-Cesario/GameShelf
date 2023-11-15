interface FormData {
	[key: string]: string;
}

class Validations {
	email(email: string): string {
		const [user, domain] = email.split("@");

		if (!email) return "Este campo não pode ficar vazio";
		if (!email.includes("@")) return "Seu email não é valido";
		if (!user || !domain) return "seu email não é valido";

		return "";
	}

	password(password: string): string {
		if (!password) return "Estem campo não pode ficar vazio";
		if (password.length < 10) return "Sua senha deve conter ao menos 10 caracteres";
		if (!/[A-Z]/.test(password)) return "Sua senha deve conter ao menos 1 letra maiúscula";
		if (!/[a-z]/.test(password)) return "Sua senha deve conter ao menos 1 letra minúscula";
		if (!/[0-9]/.test(password)) return "Sua senha deve conter ao menos 1 número";

		return "";
	}

	passwordCheck(passwordCheck: string, password: string): string {
		if (!passwordCheck) return "Estem campo não pode ficar vazio";
		if (password !== passwordCheck) return "Suas senhas devem ser iguais";

		return "";
	}
}

export const validations = new Validations();
