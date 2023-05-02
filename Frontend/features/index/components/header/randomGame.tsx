import { useDispatch } from 'react-redux';
import { useFilteredGames } from '../../hooks/useFilteredGames';
import { sliceGames } from '../../slices/games';

export const RandomGame = () => {
	const { games } = useFilteredGames();

	const dispatch = useDispatch();

	const pickRandomGame = () => {
		const gamesLength = games.length - 1;
		const randomIndex = Math.round(Math.random() * gamesLength);
		dispatch(sliceGames.actions.setGameDetails({ gameDetails: { isOpen: 'details', gameName: games[randomIndex].name } }));
	};

	return <button onClick={() => pickRandomGame()}>Aleatório</button>;
};
