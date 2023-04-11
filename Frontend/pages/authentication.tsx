import { Notification } from '@/components/notification';
import { CreateAccount } from '@/features/authentication/createAccount';
import { FormNames } from '@/features/authentication/interfaces/forms';
import { Login } from '@/features/authentication/login';
import { StyledAuthentication } from '@/styles/styledAuthentication';
import { useNotification } from '@/utils/useNotification';
import { useState } from 'react';

const Authentication = () => {
	const [formName, setFormName] = useState<FormNames>('login');
	const { isOpen } = useNotification();

	return (
		<StyledAuthentication>
			{isOpen && <Notification />}

			{formName === 'login' && <Login props={{ setFormName }} />}
			{formName === 'create' && <CreateAccount props={{ setFormName }} />}
		</StyledAuthentication>
	);
};

export default Authentication;
