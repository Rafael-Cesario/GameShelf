import { Store } from '@/context/store';
import { useSelector } from 'react-redux';

export const useFilteredGames = () => {
	const { games, searchGame, filters } = useSelector((state: Store) => state.games);

	const filterGames = () => {
		const searchGameRegExp = new RegExp(searchGame, 'i');

		const searchGames = games.filter((game) => {
			const matchName = game.name.match(searchGameRegExp);
			if (matchName) return game;

			const matchTag = game.tags.find((tag) => tag.match(searchGameRegExp));
			if (matchTag) return game;

			const matchGenre = game.genre.find((genre) => genre.match(searchGameRegExp));
			if (matchGenre) return game;

			const matchRate = game.rate.match(searchGameRegExp);
			if (matchRate) return game;
		});

		const filterGames = searchGames.filter((game) => {
			const matchTag = game.tags.find((tag) => filters.tags.find((filterTag) => filterTag === tag));
			if (!matchTag && filters.tags.length) return;

			const matchGenre = game.genre.find((genre) => filters.genre.find((filterGenre) => filterGenre === genre));
			if (!matchGenre && filters.genre.length) return;

			const matchRate = game.rate === filters.rate;
			if (!matchRate && filters.rate) return;

			return game;
		});

		return filterGames;
	};

	return { games: filterGames() };
};
