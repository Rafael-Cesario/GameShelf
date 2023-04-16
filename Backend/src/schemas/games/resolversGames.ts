import { IAddGame, IDeleteGame, IGetGames, IUpdateGame } from '../../interfaces/IGames';
import { ServicesGames } from '../../services/servicesGames';

const servicesGames = new ServicesGames();

export const resolversGames = {
	Query: {
		getGames: (_: never, variables: IGetGames) => servicesGames.getGames(variables),
	},

	Mutation: {
		addGame: (_: never, variables: IAddGame) => servicesGames.addGame(variables),
		updateGame: (_: never, variables: IUpdateGame) => servicesGames.updateGame(variables),
		deleteGame: (_: never, variables: IDeleteGame) => servicesGames.deleteGame(variables),
	},
};
