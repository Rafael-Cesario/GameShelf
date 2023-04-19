import { IMarker } from '@/interfaces/IMarkers';
import { useState } from 'react';
import { StyledCreateMarker } from '../../styles/styledCreateMarker';
import { useMarkers } from '../../hooks/useMarkers';
import { StorageUser, storageKeys } from '@/interfaces/interfaceStorageKeys';
import { Filter } from './filter';
import { useFilters } from '../../hooks/useFilters';
import { useDispatch } from 'react-redux';
import { sliceMarker } from '../../slices/marker';

const defaultValues = {
	name: '',
	filters: {
		tags: [],
		genre: [],
		rate: '',
	},
};

export const CreateMarker = () => {
	const { tags, genres, rates } = useFilters();
	const [showBuildMarker, setShowBuildMarker] = useState(false);
	const [values, setValues] = useState<IMarker>(defaultValues);
	const [error, setError] = useState('');
	const { queryAddMarker } = useMarkers();
	const dispatch = useDispatch();

	const createMarker = async () => {
		if (!values.name) return setError('Escolha um nome para o seu marcador');
		setError('');

		const storage = localStorage.getItem(storageKeys.user);
		const { email } = JSON.parse(storage || '') as StorageUser;

		const { newMarkers, error } = await queryAddMarker({ addMarker: { email, ...values } });
		if (error) return console.log('add marker error', error);

		dispatch(sliceMarker.actions.setMarkers({ newMarkers: newMarkers as IMarker[] }));
		dispatch(sliceMarker.actions.setActive({ markerName: values.name }));

		setValues(defaultValues);
		setShowBuildMarker(false);
	};

	return (
		<StyledCreateMarker>
			<button
				onClick={() => setShowBuildMarker(!showBuildMarker)}
				className="new-marker">
				Criar novo marcador
			</button>

			{showBuildMarker && (
				<div className="container">
					<div className="build-marker">
						<div className="title">
							<h1>Novo marcador</h1>
							<button
								className="close"
								onClick={() => setShowBuildMarker(false)}>
								x
							</button>
						</div>

						<span className="error">{error}</span>
						<input
							value={values.name}
							onChange={(e) => setValues({ ...values, name: e.target.value })}
							className="name"
							type="text"
							placeholder="Nome"
						/>

						<Filter props={{ title: 'Tags', filterName: 'tags', filters: tags, values, setValues }} />
						<Filter props={{ title: 'Gêneros', filterName: 'genre', filters: genres, values, setValues }} />
						<Filter props={{ title: 'Nota', filterName: 'rate', filters: rates, values, setValues }} />

						<button onClick={() => createMarker()}>Criar</button>
					</div>
				</div>
			)}
		</StyledCreateMarker>
	);
};
