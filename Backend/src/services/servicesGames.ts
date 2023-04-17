import { IAddGame, IRemoveGame, IGetGames, IUpdateGame } from '../interfaces/IGames';

export class ServicesGames {
	async getGames({ email }: IGetGames) {}

	async addGame({ addGame }: IAddGame) {}

	async updateGame({ updateGame }: IUpdateGame) {}

	async removeGame({ removeGame }: IRemoveGame) {}
}
