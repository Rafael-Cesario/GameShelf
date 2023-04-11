import { Store } from '@/context/store';
import { sliceNotification } from '@/context/sliceNotification';
import { useDispatch, useSelector } from 'react-redux';

export const useNotification = () => {
	const { isOpen, txt, type } = useSelector((state: Store) => state.notification);
	const dispatch = useDispatch();

	const sendNotification = (type: 'Erro' | 'Sucesso', txt: string) => {
		dispatch(sliceNotification.actions.sendNotification({ isOpen: true, type, txt }));

		setTimeout(() => {
			dispatch(sliceNotification.actions.close());
		}, 1000 * 10); // 10 seconds
	};

	const closeNotification = () => {
		dispatch(sliceNotification.actions.close());
	};

	return { isOpen, txt, type, closeNotification, sendNotification };
};
