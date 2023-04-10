export interface IErrors {
	default: string;
	emptyVariable: string;
	userNotFound: string;
	duplicatedUser: string;
	authentication: string;
}

export interface ISuccess {
	newUser: string;
	login: string;
}

export const Errors: IErrors = {
	default: 'Um error inesperado aconteceu, por favor tente recarregar a página ou fazer login novamente',
	userNotFound: 'Usuário não encontrado',
	emptyVariable: 'Alguns campos não foram preenchidos',
	duplicatedUser: 'Este email já esta sendo usado',
	authentication: 'Seu email ou sua senha não estão corretos',
};

export const Success: ISuccess = {
	newUser: 'Novo usuário criado com sucesso, você já pode fazer login',
	login: 'Login efetuado com sucesso, boas vindas',
};
