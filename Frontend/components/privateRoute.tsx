import Authentication from '@/pages/authentication';
import { storageKeys, StorageUser } from '@/interfaces/interfaceStorageKeys';
import { IValidateToken, ResponseValidateToken } from '@/interfaces/queriesUser';
import { client } from '@/services/client';
import { TypesQueriesUser } from '@/services/queries/user';
import { NextComponentType } from 'next';
import { useEffect, useState } from 'react';
import { Loading } from './loading';

const privateRoute = <T extends JSX.IntrinsicAttributes>(Component: NextComponentType<T>) => {
	const Auth = (props: T) => {
		const typesQueriesUser = new TypesQueriesUser();
		const [isLoading, setIsLoading] = useState(true);
		const [isLoggedIn, setIsLoggedIn] = useState(false);

		const verifyAuthentication = async () => {
			const storage = localStorage.getItem(storageKeys.user);
			if (!storage) return setIsLoading(false);

			const { token } = JSON.parse(storage) as StorageUser;
			if (!token) return setIsLoading(false);

			const { data } = await client.query<ResponseValidateToken, IValidateToken>({
				query: typesQueriesUser.VALIDATE_TOKEN,
				variables: { token },
			});

			if (data.validateToken.message === 'false') return setIsLoading(false);

			setIsLoading(false);
			setIsLoggedIn(true);
		};

		useEffect(() => {
			verifyAuthentication();
		}, []);

		// todo > Loading component
		if (isLoading) return <Loading />;
		if (!isLoggedIn) return <Authentication />;

		return <Component {...props} />;
	};

	return Auth;
};

export { privateRoute };
