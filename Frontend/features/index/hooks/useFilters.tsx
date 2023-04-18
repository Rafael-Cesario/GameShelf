import { useSelector } from 'react-redux';
import { getAllFilters } from '../utils/getAllFilters';
import { Store } from '@/context/store';

export const useFilters = () => {
	const { markers } = useSelector((state: Store) => state.marker);
	const { tags, genres } = getAllFilters(markers);
	const rates = ['Ruim', 'Normal', 'Bom', 'Ótimo', 'Favorito'];

	return { tags, genres, rates };
};
