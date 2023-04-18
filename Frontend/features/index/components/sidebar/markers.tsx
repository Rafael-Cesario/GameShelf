import { useState, useEffect } from 'react';
import { useMarkers } from '../../hooks/useMarkers';
import { StyledMarkers } from '../../styles/styledMarkers';
import { Loading } from './loading';
import { storageKeys } from '@/interfaces/interfaceStorageKeys';
import { StorageUser } from '@/interfaces/interfaceStorageKeys';
import { IMarker } from '@/interfaces/IMarkers';

export const Markers = () => {
	const { queryGetMarkers } = useMarkers();
	const [loadingMarkers, setLoadingMarkers] = useState(true);
	const [markers, setMarkers] = useState<IMarker[]>([]);

	const getMarkers = async () => {
		const storage = localStorage.getItem(storageKeys.user);
		const { email } = JSON.parse(storage || '') as StorageUser;
		const markers = await queryGetMarkers({ email });

		setLoadingMarkers(false);
		setMarkers(markers);
	};

	useEffect(() => {
		getMarkers();
	}, []);

	return (
		<StyledMarkers>
			<li className="active">Todos</li>

			{loadingMarkers && <Loading />}

			{markers.map((marker) => (
				<li key={marker.name}>{marker.name}</li>
			))}
		</StyledMarkers>
	);
};
