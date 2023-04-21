import { IGame } from '@/interfaces/IGames';

export const getAllFilters = (games: IGame[]) => {
	const tags: string[] = [];
	const genres: string[] = [];

	games.forEach((game) => {
		tags.push(...game.tags);
		genres.push(...game.genre);
	});

	return { tags: Array.from(new Set(tags)), genres: Array.from(new Set(genres)) };
};
