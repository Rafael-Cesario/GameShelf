import { Notification } from '@/components/notification';
import { Store } from '@/context/store';
import { CreateAccount } from '@/features/authentication/createAccount';
import { Login } from '@/features/authentication/login';
import { StyledAuthentication } from '@/styles/styledAuthentication';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export type FormNames = 'login' | 'create';

const Authentication = () => {
	const [formName, setFormName] = useState<FormNames>('login');
	const { isOpen } = useSelector((state: Store) => state.notification);

	return (
		<StyledAuthentication>
			{isOpen && <Notification />}

			{formName === 'login' && <Login props={{ setFormName }} />}
			{formName === 'create' && <CreateAccount props={{ setFormName }} />}
		</StyledAuthentication>
	);
};

export default Authentication;
