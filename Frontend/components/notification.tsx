import { StyledNotification } from './styles/styledNotification';
import { useNotification } from '@/utils/useNotification';

export const Notification = () => {
	const { txt, type, closeNotification } = useNotification();

	return (
		<StyledNotification type={type} role="notification">
			<button className="close" onClick={() => closeNotification()}>
				x
			</button>

			<h1 className="title">{type}</h1>
			<p className="txt">{txt}</p>
		</StyledNotification>
	);
};
