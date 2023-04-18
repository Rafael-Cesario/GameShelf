import { useState, useEffect } from 'react';
import { useMarkers } from '../../hooks/useMarkers';
import { StyledMarkers } from '../../styles/styledMarkers';
import { Loading } from './loading';
import { storageKeys } from '@/interfaces/interfaceStorageKeys';
import { StorageUser } from '@/interfaces/interfaceStorageKeys';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '@/context/store';
import { sliceMarker } from '../../slices/marker';

export const Markers = () => {
	const { queryGetMarkers } = useMarkers();
	const [loadingMarkers, setLoadingMarkers] = useState(true);

	const { markers, active } = useSelector((state: Store) => state.marker);
	const dispatch = useDispatch();

	const getMarkers = async () => {
		const storage = localStorage.getItem(storageKeys.user);
		const { email } = JSON.parse(storage || '') as StorageUser;
		const newMarkers = await queryGetMarkers({ email });

		setLoadingMarkers(false);
		dispatch(sliceMarker.actions.setMarkers({ newMarkers }));
	};

	useEffect(() => {
		getMarkers();
	}, []);

	return (
		<StyledMarkers>
			<li
				className={active === 'todos' ? 'active' : ''}
				onClick={() => dispatch(sliceMarker.actions.setActive({ markerName: 'todos' }))}>
				Todos
			</li>

			{loadingMarkers && <Loading />}

			{markers?.map((marker) => (
				<li
					role="marker"
					className={active === marker.name ? 'active' : ''}
					onClick={() => dispatch(sliceMarker.actions.setActive({ markerName: marker.name }))}
					key={marker.name}>
					{marker.name}
				</li>
			))}
		</StyledMarkers>
	);
};
