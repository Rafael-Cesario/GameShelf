import { useMutation } from '@apollo/client';
import { ResponseCreateUser, ICreateUser, IUser, ILogin, ResponseLogin } from '../../../interfaces/IUsers';
import { TypesQueriesUser } from '@/services/queries/user';
import { Errors, Success } from '@/interfaces/interfaceResponses';

export const useQueriesUser = () => {
	const typesQueriesUser = new TypesQueriesUser();

	const [queryCreateUser, { loading: loadingCreateUser }] = useMutation<ResponseCreateUser, ICreateUser>(typesQueriesUser.CREATE_USER);
	const [queryLogin, { loading: loadingLogin }] = useMutation<ResponseLogin, ILogin>(typesQueriesUser.LOGIN);

	const requestCreateUser = async ({ email, password }: IUser) => {
		try {
			const { data } = await queryCreateUser({ variables: { createUser: { email, password } } });
			const [successCode] = data!.createUser.message.split(': ');
			return { data: Success[successCode as keyof typeof Success] };
		} catch (error: any) {
			const [errorCode, errorMessage] = error.message.split(': ');
			return { error: Errors[errorCode as keyof typeof Errors] ?? Errors.default };
		}
	};

	const requestLogin = async ({ email, password }: IUser) => {
		try {
			const { data } = await queryLogin({ variables: { login: { email, password } } });
			const [successCode] = data!.login.message.split(': ');
			return { data: Success[successCode as keyof typeof Success], token: data!.login.token };
		} catch (error: any) {
			const [errorCode] = error.message.split(': ');
			return { error: Errors[errorCode as keyof typeof Errors] ?? Errors.default };
		}
	};

	return { requestCreateUser, loadingCreateUser, requestLogin, loadingLogin };
};
