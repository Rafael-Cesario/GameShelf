import { useState } from 'react';
import { useMarkers } from '../../hooks/useMarkers';
import { StyledMarkers } from '../../styles/styledMarkers';
import { Loading } from './loading';

export const Markers = () => {
	const { getMarkers } = useMarkers();
	const [loadingMarkers, setLoadingMarkers] = useState(true);

	return (
		<StyledMarkers>
			<li className="active">Todos</li>

			{loadingMarkers && <Loading />}
		</StyledMarkers>
	);
};
