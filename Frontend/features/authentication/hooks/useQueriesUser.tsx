import { useMutation } from '@apollo/client';
import { ResponseCreateUser, ICreateUser, IUser } from '../../../interfaces/queriesUser';
import { TypesQueriesUser } from '@/services/queries/user';

export const useQueriesUser = () => {
	const typesQueriesUser = new TypesQueriesUser();

	const [queryCreateUser, { loading }] = useMutation<ResponseCreateUser, ICreateUser>(typesQueriesUser.CREATE_USER);

	const createUser = async ({ email, password }: IUser) => {
		try {
			const { data } = await queryCreateUser({ variables: { createUser: { email, password } } });
			return { data };
		} catch (error: any) {
			return { error: error.message };
		}
	};

	return { createUser, loading };
};
