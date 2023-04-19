import { IMarker } from '@/interfaces/IMarkers';
import { useState } from 'react';
import { useMarkers } from '../../hooks/useMarkers';
import { StorageUser, storageKeys } from '@/interfaces/interfaceStorageKeys';
import { useDispatch } from 'react-redux';
import { sliceMarker } from '../../slices/marker';
import { StyledBuildMarker } from '../../styles/styledBuildMarker';
import { BuildMarker } from './buildMarker';

const defaultValues = {
	name: '',
	filters: {
		tags: [],
		genre: [],
		rate: '',
	},
};

export const CreateMarker = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [values, setValues] = useState<IMarker>(defaultValues);
	const [error, setError] = useState('');
	const { requestAddMarker } = useMarkers();
	const dispatch = useDispatch();

	const createMarker = async () => {
		if (!values.name) return setError('Escolha um nome para o seu marcador');
		setError('');

		const storage = localStorage.getItem(storageKeys.user);
		const { email } = JSON.parse(storage || '') as StorageUser;

		const { newMarkers, error } = await requestAddMarker({ addMarker: { email, ...values } });
		if (error) return console.log('add marker error', error);

		dispatch(sliceMarker.actions.setMarkers({ newMarkers: newMarkers as IMarker[] }));
		dispatch(sliceMarker.actions.setActive({ markerName: values.name }));

		setValues(defaultValues);
		setIsOpen(false);
	};

	return (
		<StyledBuildMarker>
			<button
				role="open-create-marker"
				onClick={() => setIsOpen(!isOpen)}
				className="open-button">
				Criar novo marcador
			</button>

			{isOpen && (
				<BuildMarker props={{ title: 'Novo Marcador', values, setValues, error, setIsOpen }}>
					<div className="buttons">
						<button
							role="create-marker"
							onClick={() => createMarker()}>
							Criar
						</button>
					</div>
				</BuildMarker>
			)}
		</StyledBuildMarker>
	);
};
