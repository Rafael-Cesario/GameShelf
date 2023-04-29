import { Store } from '@/context/store';
import { IGame } from '@/interfaces/IGames';
import { useSelector } from 'react-redux';

export const useGame = (gameName: string) => {
	const { games } = useSelector((state: Store) => state.games);
	const game = games.find((game) => game.name === gameName) as IGame;
	return { ...game };
};
