import { Store } from '@/context/store';
import { useDispatch, useSelector } from 'react-redux';
import { sliceMarker } from '../../slices/marker';

export const MarkerSearch = () => {
	const { filter } = useSelector((state: Store) => state.marker);
	const dispatch = useDispatch();

	return (
		<input
			type="text"
			placeholder="Marcador"
			role="marker-search"
			className="marker-search"
			value={filter}
			onChange={(e) => dispatch(sliceMarker.actions.setFilter({ filter: e.target.value }))}
		/>
	);
};
