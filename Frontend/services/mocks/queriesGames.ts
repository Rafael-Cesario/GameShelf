import { IAddGame, IGame, IUpdateGame } from '@/interfaces/IGames';
import { graphql } from 'msw';

const games: IGame[] = [];

export const mockQueriesGames = [
	graphql.query('GetGames', (req, res, ctx) => {
		return res(ctx.data({ getGames: { games } }));
	}),

	graphql.mutation('AddGame', (req, res, ctx) => {
		const { addGame } = req.variables as IAddGame;
		const { game } = addGame;

		games.push(game);
		return res(ctx.data({ addGame: { newGames: games } }));
	}),

	graphql.mutation('UpdateGame', (req, res, ctx) => {
		const { updateGame } = req.variables as IUpdateGame;
		const { gameName, update } = updateGame;

		const gameIndex = games.findIndex((game) => game.name === gameName);
		games.splice(gameIndex, 1, update);

		return res(ctx.data({ updateGame: { newGames: games } }));
	}),
];
