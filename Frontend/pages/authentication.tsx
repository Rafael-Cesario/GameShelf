import { CreateAccount } from '@/features/authentication/createAccount';
import { Login } from '@/features/authentication/login';
import { StyledAuthentication } from '@/styles/styledAuthentication';
import { useState } from 'react';

export type FormNames = 'login' | 'create';

const Authentication = () => {
	const [formName, setFormName] = useState<FormNames>('login');

	return (
		<StyledAuthentication>
			{formName === 'login' && <Login props={{ setFormName }} />}
			{formName === 'create' && <CreateAccount props={{ setFormName }} />}
		</StyledAuthentication>
	);
};

export default Authentication;
