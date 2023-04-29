import { Store } from '@/context/store';
import { useSelector } from 'react-redux';

export const useFilteredGames = () => {
	const { games, searchGame, filters } = useSelector((state: Store) => state.games);

	const filterGames = () => {
		const filterGames = games.filter((game) => {
			const matchTag = game.tags.find((tag) => filters.tags.find((filterTag) => filterTag === tag));
			if (!matchTag && filters.tags.length) return;

			const matchGenre = game.genre.find((genre) => filters.genre.find((filterGenre) => filterGenre === genre));
			if (!matchGenre && filters.genre.length) return;

			const matchRate = game.rate === filters.rate;
			if (!matchRate && filters.rate) return;

			return game;
		});

		const searchGames = filterGames.filter((game) => {
			const searchGameRegExp = new RegExp(searchGame, 'i');
			const matchName = game.name.match(searchGameRegExp);
			if (matchName) return game;
		});

		return searchGames;
	};

	return { games: filterGames() };
};
