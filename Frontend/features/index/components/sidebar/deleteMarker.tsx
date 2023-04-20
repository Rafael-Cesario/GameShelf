import { useState } from 'react';
import { useMarkers } from '../../hooks/useMarkers';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '@/context/store';
import { StorageUser, storageKeys } from '@/interfaces/interfaceStorageKeys';
import { sliceMarker } from '../../slices/marker';
import { useNotification } from '@/utils/useNotification';

interface DeleteMarkerProps {
	setIsOpen: (isOpen: boolean) => void;
}

export const DeleteMarker = ({ setIsOpen }: DeleteMarkerProps) => {
	const [showDelete, setShowDelete] = useState(false);
	const { active } = useSelector((state: Store) => state.marker);

	const { requestDeleteMarker } = useMarkers();
	const { sendNotification } = useNotification();

	const dispatch = useDispatch();

	const deleteMarker = async () => {
		const storage = localStorage.getItem(storageKeys.user);
		const { email } = JSON.parse(storage || '') as StorageUser;

		const { message, error } = await requestDeleteMarker({
			deleteMarker: { email, name: active },
		});

		if (error) return sendNotification('Erro', error);
		if (!message) return sendNotification('Erro', 'Um erro ocorreu por favor recarregue a página e tente novamente');

		sendNotification('Sucesso', message);
		dispatch(sliceMarker.actions.deleteMarker({ name: active }));
		setIsOpen(false);
	};

	return (
		<>
			{showDelete || (
				<button
					onClick={() => setShowDelete(true)}
					className="delete">
					Excluir
				</button>
			)}

			{showDelete && (
				<button
					className="delete"
					autoFocus={true}
					onBlur={() => setShowDelete(false)}
					onClick={() => deleteMarker()}>
					Clique novamente para excluir esta lista
				</button>
			)}
		</>
	);
};
