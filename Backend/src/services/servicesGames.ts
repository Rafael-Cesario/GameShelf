import { GraphQLError } from 'graphql';
import { IAddGame, IRemoveGame, IGetGames, IUpdateGame } from '../interfaces/IGames';
import { Errors } from '../interfaces/IResponses';
import { ModelGames } from '../models/modelGames';

export class ServicesGames {
	async getGames({ email }: IGetGames) {
		if (!email) throw new GraphQLError(Errors.emptyVariable + 'Email was not provided');

		const user = await ModelGames.findOne({ user: email });
		if (!user) throw new GraphQLError(Errors.userNotFound);

		return { games: user.games };
	}

	async addGame({ addGame }: IAddGame) {}

	async updateGame({ updateGame }: IUpdateGame) {}

	async removeGame({ removeGame }: IRemoveGame) {}
}
