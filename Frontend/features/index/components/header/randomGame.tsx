import { useFilteredGames } from '../../hooks/useFilteredGames';

export const RandomGame = () => {
	const { games } = useFilteredGames();

	const pickRandomGame = () => {
		const gamesLength = games.length - 1;
		const randomIndex = Math.round(Math.random() * gamesLength);
	};

	return (
		<>
			<button onClick={() => pickRandomGame()}>Aleatório</button>
		</>
	);
};
