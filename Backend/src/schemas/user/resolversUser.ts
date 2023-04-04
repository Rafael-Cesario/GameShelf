export const resolversUser = {
	Query: {
		getUsers: () => {
			return [
				{
					email: 'user@email.com',
					password: '123',
				},
			];
		},
	},
};
