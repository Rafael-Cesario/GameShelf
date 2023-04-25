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
		const hasEmptyValues = searchForEmptyValues(addGame);
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

	async updateGame({ updateGame }: IUpdateGame) {
		const hasEmptyValues = searchForEmptyValues(updateGame);
		if (hasEmptyValues) throw new GraphQLError(Errors.emptyVariable + hasEmptyValues);

		const { email, gameName, update } = updateGame;

		const user = await ModelGames.findOne({ user: email });
		if (!user) throw new GraphQLError(Errors.userNotFound);

		const gameIndex = user.games.findIndex((game) => game.name === gameName);
		if (gameIndex < 0) throw new GraphQLError(Errors.gameNotFound);

		const newGameData = { ...user.games[gameIndex], ...update };
		user.games[gameIndex] = newGameData;
		await user.save();

		return { newGames: user.games };
	}

	async removeGame({ removeGame }: IRemoveGame) {
		const hasEmptyValues = searchForEmptyValues(removeGame);
		if (hasEmptyValues) throw new GraphQLError(Errors.emptyVariable + hasEmptyValues);

		const { email, gameName } = removeGame;

		const user = await ModelGames.findOne({ user: email });
		if (!user) throw new GraphQLError(Errors.userNotFound);

		const gameIndex = user.games.findIndex((game) => game.name === gameName);
		if (gameIndex < 0) throw new GraphQLError(Errors.gameNotFound);

		user.games.splice(gameIndex, 1);
		await user.save();

		return { newGames: user.games };
	}
}
