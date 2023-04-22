import { IAddGame, IGame } from '@/interfaces/IGames';
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
];
