export class Validations {
	email(email: string) {
		if (!email) return 'Este campo não pode ficar vazio';
		if (!email.includes('@')) return 'Seu email não parece valido, o simbolo "@" não foi encontrado';
	}

	password(password: string) {
		if (!password) return 'Este campo não pode ficar vazio';
	}
}
