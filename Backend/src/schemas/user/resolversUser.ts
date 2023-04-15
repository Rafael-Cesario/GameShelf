import { ICreateUser, IGetUser, ILogin, IValidateToken } from '../../interfaces/IUsers';
import { ServicesUser } from '../../services/servicesUser';

const servicesUser = new ServicesUser();

export const resolversUser = {
	Query: {
		getUser: (parent: never, variables: IGetUser) => servicesUser.getUser(variables),
		validateToken: (parent: never, variables: IValidateToken) => servicesUser.validateToken(variables),
	},

	Mutation: {
		createUser: (parent: never, variables: ICreateUser) => servicesUser.createUser(variables),
		login: (parent: never, variables: ILogin) => servicesUser.login(variables),
	},
};
