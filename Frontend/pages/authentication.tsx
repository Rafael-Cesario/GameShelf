import { CreateAccount } from '@/features/authentication/createAccount';
import { Login } from '@/features/authentication/login';
import { StyledAuthentication } from '@/styles/styledAuthentication';

const Authentication = () => {
	return (
		<StyledAuthentication>
			<Login />
			{/* <CreateAccount /> */}
		</StyledAuthentication>
	);
};

export default Authentication;
