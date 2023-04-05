import Authentication from '@/pages/authentication';
import { NextComponentType } from 'next';
import { useEffect, useState } from 'react';

const privateRoute = <T extends JSX.IntrinsicAttributes>(Component: NextComponentType<T>) => {
	const Auth = (props: T) => {
		const [isLoading, setIsLoading] = useState(true);
		const isLoggedIn = true;

		useEffect(() => {
			setTimeout(() => {
				setIsLoading(false);
			}, 2000);
		}, []);

		if (isLoading) return <h1>Loading...</h1>;

		if (!isLoggedIn) return <Authentication />;

		return <Component {...props} />;
	};

	return Auth;
};

export { privateRoute };
