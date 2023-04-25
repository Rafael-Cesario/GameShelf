import { Store } from '@/context/store';
import { useSelector } from 'react-redux';

export const useGame = (gameIndex: number) => {
	const { games } = useSelector((state: Store) => state.games);
	const game = games[gameIndex];
	return { ...game };
};
