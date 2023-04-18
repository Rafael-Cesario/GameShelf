import { IMarker } from '@/interfaces/IMarkers';
import produce from 'immer';
import { useState } from 'react';
import { StyledCreateMarker } from '../../styles/styledCreateMarker';

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

	const createMarker = () => {
		if (!values.name) return setError('Escolhar um nome para o seu marcador');
		setError('');
	};

	// todo > placeholder
	const tags = ['Favoritos', 'Zerados', 'Wishlist'];
	const genres = ['Acão', 'RPG', 'Survival'];
	const rates = ['Ruim', 'Normal', 'Bom', 'Ótimo', 'Favorito'];

	const changeRate = (newValue: string) => {
		const newValues = produce(values, (draft) => {
			draft.filters.rate = draft.filters.rate === newValue ? '' : newValue;
		});

		setValues(newValues);
	};

	const changeFilters = (filterName: 'tags' | 'genre', value: string) => {
		const newValues = produce(values, (draft) => {
			const filters = draft.filters[filterName];
			const hasValue = filters.indexOf(value);

			if (hasValue < 0) filters.push(value);
			else filters.splice(hasValue, 1);

			draft.filters[filterName] = filters;
		});

		setValues(newValues);
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

						<h2>Tags</h2>
						<div className="tags">
							{tags.map((tags) => (
								<button
									className={values.filters.tags.includes(tags) ? 'active' : ''}
									onClick={() => changeFilters('tags', tags)}
									key={tags}>
									{tags}
								</button>
							))}
						</div>

						<h2>Genêros</h2>
						<div className="genre">
							{genres.map((genre) => (
								<button
									className={values.filters.genre.includes(genre) ? 'active' : ''}
									onClick={() => changeFilters('genre', genre)}
									key={genre}>
									{genre}
								</button>
							))}
						</div>

						<h2>Nota</h2>
						<div className="rate">
							{rates.map((rate) => (
								<button
									key={rate}
									className={rate === values.filters.rate ? 'active' : ''}
									onClick={() => changeRate(rate)}>
									{rate}
								</button>
							))}
						</div>

						<button onClick={() => createMarker()}>Criar</button>
					</div>
				</div>
			)}
		</StyledCreateMarker>
	);
};
