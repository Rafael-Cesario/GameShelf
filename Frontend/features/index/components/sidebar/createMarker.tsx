import { IMarker } from '@/interfaces/IMarkers';
import { useState } from 'react';
import { StyledCreateMarker } from '../../styles/styledCreateMarker';
import { useMarkers } from '../../hooks/useMarkers';
import { StorageUser, storageKeys } from '@/interfaces/interfaceStorageKeys';
import { Filter } from './filter';

const defaultValues = {
	name: '',
	filters: {
		tags: [],
		genre: [],
		rate: '',
	},
};

export const CreateMarker = () => {
	const [showBuildMarker, setShowBuildMarker] = useState(false);
	const [values, setValues] = useState<IMarker>(defaultValues);
	const [error, setError] = useState('');
	const { queryAddMarker } = useMarkers();

	const createMarker = async () => {
		if (!values.name) return setError('Escolhar um nome para o seu marcador');
		setError('');

		const storage = localStorage.getItem(storageKeys.user);
		const { email } = JSON.parse(storage || '') as StorageUser;

		const { error } = await queryAddMarker({ addMarker: { email, ...values } });
		if (error) return console.log('add marker error', error);

		// todo > update marker global state
		// todo > upate current marker

		setValues(defaultValues);
		setShowBuildMarker(false);
	};

	// todo > placeholder
	const tags = ['Favoritos', 'Zerados', 'Wishlist'];
	const genres = ['Acão', 'RPG', 'Survival'];
	const rates = ['Ruim', 'Normal', 'Bom', 'Ótimo', 'Favorito'];

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
