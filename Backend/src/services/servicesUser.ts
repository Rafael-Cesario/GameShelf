import { IGetUser } from '../interfaces/interfacesUser';

export class ServicesUser {
	async getUser({ email }: IGetUser) {
		return {
			email,
			password: '',
		};
	}
}
