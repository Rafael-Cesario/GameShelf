import { IGame } from '@/interfaces/IGames';

export const getAllFilters = (games: IGame[]) => {
	const tags: string[] = [];
	const genre: string[] = [];

	games.forEach((game) => {
		tags.push(...game.tags);
		genre.push(...game.genre);
	});

	return { tags: Array.from(new Set(tags)), genre: Array.from(new Set(genre)) };
};
