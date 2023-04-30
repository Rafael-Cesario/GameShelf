import { useState, useEffect } from 'react';
import { useMarkers } from '../../hooks/useMarkers';
import { StyledMarkers } from '../../styles/styledMarkers';
import { Loading } from './loading';
import { storageKeys } from '@/interfaces/interfaceStorageKeys';
import { StorageUser } from '@/interfaces/interfaceStorageKeys';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '@/context/store';
import { sliceMarker } from '../../slices/marker';
import { IMarker } from '@/interfaces/IMarkers';
import { sliceGames } from '../../slices/games';

export const Markers = () => {
	const { queryGetMarkers } = useMarkers();
	const [loadingMarkers, setLoadingMarkers] = useState(true);

	const { markers, active, filter } = useSelector((state: Store) => state.marker);
	const dispatch = useDispatch();

	const getMarkers = async () => {
		const storage = localStorage.getItem(storageKeys.user);
		const { email } = JSON.parse(storage || '') as StorageUser;
		const newMarkers = await queryGetMarkers({ email });

		setLoadingMarkers(false);
		dispatch(sliceMarker.actions.setMarkers({ newMarkers }));
	};

	const filterMarkers = () => {
		const filterRegEx = new RegExp(filter, 'ig');
		const filteredMarkers = markers.filter((marker) => marker.name.match(filterRegEx));
		return filteredMarkers;
	};

	const activateMarker = (marker: IMarker) => {
		const newFilters = { genre: marker.filters.genre, tags: marker.filters.tags, rate: marker.filters.rate[0] };
		dispatch(sliceMarker.actions.setActive({ markerName: marker.name }));
		dispatch(sliceGames.actions.setFilters({ newFilters }));
	};

	useEffect(() => {
		getMarkers();
	}, []);

	return (
		<StyledMarkers>
			<li
				role="marker"
				className={active === 'todos' ? 'active' : ''}
				onClick={() => activateMarker({ name: 'todos', filters: { tags: [], genre: [], rate: '' } })}>
				Todos
			</li>

			{loadingMarkers && <Loading />}

			{filterMarkers().map((marker) => (
				<li role="marker" className={active === marker.name ? 'active' : ''} onClick={() => activateMarker(marker)} key={marker.name}>
					{marker.name}
				</li>
			))}
		</StyledMarkers>
	);
};
