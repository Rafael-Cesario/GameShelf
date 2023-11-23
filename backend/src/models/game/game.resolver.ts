import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { GameModel } from "./game.model";
import { GameService } from "./game.service";
import { AddGameInput, UpdateGameInput } from "./game.dto";

@Resolver(() => GameModel)
export class GameResolver {
	constructor(private gameService: GameService) {}

	@Mutation(() => String)
	async addGame(@Args("addGameData") addGameData: AddGameInput) {
		return await this.gameService.addGame(addGameData);
	}

	@Query(() => [GameModel])
	async getGames(@Args("userID") userID: string) {
		return await this.gameService.getGames(userID);
	}

	@Mutation(() => GameModel)
	async updateGame(@Args("updateGameData") updateGameData: UpdateGameInput) {
		return await this.gameService.updateGame(updateGameData);
	}

	@Mutation(() => String)
	async removeGame(@Args("gameID") gameID: number) {
		return await this.gameService.removeGame(gameID);
	}
}
