export class Validations {
	email(email: string) {
		if (!email) return 'Este campo não pode ficar vazio';
		if (!email.includes('@')) return 'Seu email não parece valido, o simbolo "@" não foi encontrado';

		const [user, domain] = email.split('@');
		if (!user || !domain) return 'Email invalido, usuário ou domínio não encontrado';
	}

	name(name: string) {
		if (!name) return 'Este campo não pode ficar vazio';
		if (name.length > 30) return 'Seu nome é muito grande';
	}

	password(password: string) {
		if (!password) return 'Este campo não pode ficar vazio';
		if (password.length < 5) return 'Sua senha é fraca';
		if (password.length < 10) return 'Sua senha deve conter pelo menos 12 caracteres';
		if (!password.match(/[a-z]/)) return 'Sua senha deve conter uma letra minúscula';
		if (!password.match(/[A-Z]/)) return 'Sua senha deve conter uma letra maiúscula';
		if (!password.match(/[0-9]/)) return 'Sua senha deve conter um número';
	}

	confirmPassword(confirmPassword: string, password: string) {
		if (!confirmPassword) return 'Este campo não pode ficar vazio';
		if (confirmPassword !== password) return 'Suas senhas não estão iguais';
	}
}
