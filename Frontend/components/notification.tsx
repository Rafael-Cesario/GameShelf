import { Store } from '@/context/store';
import { StyledNotification } from './styles/styledNotification';
import { useSelector, useDispatch } from 'react-redux';
import { sliceNotification } from '@/context/sliceNotification';

export const Notification = () => {
	const dispatch = useDispatch();
	const { txt, type } = useSelector((state: Store) => state.notification);

	return (
		<StyledNotification type={type}>
			<button className="close" onClick={() => dispatch(sliceNotification.actions.close())}>
				x
			</button>

			<h1 className="title">{type}</h1>
			<p className="txt">{txt}</p>
		</StyledNotification>
	);
};
