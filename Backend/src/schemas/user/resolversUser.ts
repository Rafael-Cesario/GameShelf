import { IGetUser } from '../../interfaces/interfacesUser';
import { ServicesUser } from '../../services/servicesUser';

const servicesUser = new ServicesUser();

export const resolversUser = {
	Query: {
		getUser: (parent: never, variables: IGetUser) => servicesUser.getUser(variables),
	},
};
