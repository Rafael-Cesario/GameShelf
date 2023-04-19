import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '@/context/store';
import { IMarker } from '@/interfaces/IMarkers';
import { BuildMarker } from './buildMarker';
import { StyledBuildMarker } from '../../styles/styledBuildMarker';
import { useMarkers } from '../../hooks/useMarkers';
import { StorageUser, storageKeys } from '@/interfaces/interfaceStorageKeys';
import { sliceMarker } from '../../slices/marker';

export const MarkerConfigs = () => {
	const { active, markers } = useSelector((state: Store) => state.marker);
	const [values, setValues] = useState<IMarker>(markers[0]);
	const [oldName, setOldName] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [error, setError] = useState('');
	const { requestUpdateMarker } = useMarkers();
	const dispatch = useDispatch();

	const openConfigs = () => {
		const currentMarker = markers.find((marker) => marker.name === active) || markers[0];
		setOldName(currentMarker.name);
		setValues(currentMarker);
		setIsOpen(true);
	};

	const saveMarker = async () => {
		if (!values.name) return setError('Seu marcador precisa de um nome');
		setError('');

		const storage = localStorage.getItem(storageKeys.user) || '';
		const { email } = JSON.parse(storage) as StorageUser;

		const name = values.name;
		const filters = { tags: values.filters.tags, genre: values.filters.genre, rate: values.filters.rate };

		const { newMarker, error } = await requestUpdateMarker({
			updateMarker: { email, name: oldName, update: { name, filters } },
		});

		if (error || !newMarker) return setError('Um erro ocorreu');

		dispatch(sliceMarker.actions.updateMarker({ oldName, newMarker }));
		setIsOpen(false);
	};

	return (
		<StyledBuildMarker>
			<button
				className="open-button"
				onClick={() => openConfigs()}>
				Editar marcador atual
			</button>

			{isOpen && (
				<BuildMarker props={{ title: values.name, error, values, setValues, setIsOpen }}>
					<div className="buttons">
						<button onClick={() => saveMarker()}>Salvar</button>
						<button className="delete">Excluir</button>
					</div>
				</BuildMarker>
			)}
		</StyledBuildMarker>
	);
};
