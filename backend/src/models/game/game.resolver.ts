import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { GameModel } from "./game.model";
import { GameService } from "./game.service";
import { AddGameInput } from "./game.dto";

// User can add games to collections
// User can get games
// User can update which collections a game belongs
// User can remove a game from a collection

@Resolver(() => GameModel)
export class GameResolver {
	constructor(private gameService: GameService) {}

	@Mutation(() => String)
	async addGame(@Args("addGameData") addGameData: AddGameInput) {
		return await this.gameService.addGame(addGameData);
	}
}
