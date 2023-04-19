import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Store } from '@/context/store';
import { IMarker } from '@/interfaces/IMarkers';
import { BuildMarker } from './buildMarker';
import { StyledBuildMarker } from '../../styles/styledBuildMarker';

export const MarkerConfigs = () => {
	const { active, markers } = useSelector((state: Store) => state.marker);
	const [values, setValues] = useState<IMarker>(markers[0]);
	const [isOpen, setIsOpen] = useState(false);
	const [error, setError] = useState('');

	const openConfigs = () => {
		const currentMarker = markers.find((marker) => marker.name === active) || markers[0];
		setValues(currentMarker);
		setIsOpen(true);
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
						<button>Salvar</button>
						<button>Excluir</button>
					</div>
				</BuildMarker>
			)}
		</StyledBuildMarker>
	);
};
