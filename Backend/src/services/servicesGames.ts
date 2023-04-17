import { GraphQLError, graphql } from 'graphql';
import { IAddGame, IRemoveGame, IGetGames, IUpdateGame } from '../interfaces/IGames';
import { Errors } from '../interfaces/IResponses';
import { ModelGames } from '../models/modelGames';
import { searchForEmptyValues } from '../utils/emptyValues';

export class ServicesGames {
	async getGames({ email }: IGetGames) {
		if (!email) throw new GraphQLError(Errors.emptyVariable + 'Email was not provided');

		const user = await ModelGames.findOne({ user: email });
		if (!user) throw new GraphQLError(Errors.userNotFound);

		return { games: user.games };
	}

	async addGame({ addGame }: IAddGame) {
		const hasEmptyValues = searchForEmptyValues(addGame) + searchForEmptyValues(addGame.game);
		if (hasEmptyValues) throw new GraphQLError(Errors.emptyVariable + hasEmptyValues);

		const { email, game } = addGame;

		let user = await ModelGames.findOne({ user: email });
		if (!user) user = await ModelGames.create({ user: email, games: [] });

		const gameAlreadyExist = user.games.findIndex((currentGame) => currentGame.name === addGame.game.name) < 0 ? false : true;
		if (gameAlreadyExist) throw new GraphQLError(Errors.duplicatedGame);

		user.games.push(game);
		await user.save();

		return { newGames: user.games };
	}

	async updateGame({ updateGame }: IUpdateGame) {}

	async removeGame({ removeGame }: IRemoveGame) {}
}
