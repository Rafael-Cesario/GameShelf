import { useState } from 'react';
import { useMarkers } from '../../hooks/useMarkers';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '@/context/store';
import { StorageUser, storageKeys } from '@/interfaces/interfaceStorageKeys';
import { sliceMarker } from '../../slices/marker';

interface DeleteMarkerProps {
	setIsOpen: (isOpen: boolean) => void;
}

export const DeleteMarker = ({ setIsOpen }: DeleteMarkerProps) => {
	const [showDelete, setShowDelete] = useState(false);
	const { requestDeleteMarker } = useMarkers();
	const { active } = useSelector((state: Store) => state.marker);
	const dispatch = useDispatch();

	const deleteMarker = async () => {
		const storage = localStorage.getItem(storageKeys.user);
		const { email } = JSON.parse(storage || '') as StorageUser;

		const { message, error } = await requestDeleteMarker({
			deleteMarker: { email, name: active },
		});

		if (!message || error) console.log(error);

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
