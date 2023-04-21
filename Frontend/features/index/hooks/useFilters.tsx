import { useSelector } from 'react-redux';
import { getAllFilters } from '../utils/getAllFilters';
import { Store } from '@/context/store';

export const useFilters = () => {
	const { games } = useSelector((state: Store) => state.games);
	const { tags, genre } = getAllFilters(games);
	const rates = ['Ruim', 'Normal', 'Bom', 'Ótimo', 'Favorito'];

	return { tags, genre, rates };
};
