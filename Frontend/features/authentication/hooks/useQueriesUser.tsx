import { useMutation } from '@apollo/client';
import { ResponseCreateUser, ICreateUser, IUser } from '../../../interfaces/queriesUser';
import { TypesQueriesUser } from '@/services/queries/user';
import { Errors, Success } from '@/interfaces/interfaceResponses';

export const useQueriesUser = () => {
	const typesQueriesUser = new TypesQueriesUser();

	const [queryCreateUser, { loading }] = useMutation<ResponseCreateUser, ICreateUser>(typesQueriesUser.CREATE_USER);

	const createUser = async ({ email, password }: IUser) => {
		try {
			const { data } = await queryCreateUser({ variables: { createUser: { email, password } } });
			const [successCode] = data!.createUser.message.split(': ');
			return { data: Success[successCode as keyof typeof Success] };
		} catch (error: any) {
			const [errorCode, errorMessage] = error.message.split(': ');
			console.log({ errorMessage });
			return { error: Errors[errorCode as keyof typeof Errors] ?? Errors.default };
		}
	};

	return { createUser, loading };
};
