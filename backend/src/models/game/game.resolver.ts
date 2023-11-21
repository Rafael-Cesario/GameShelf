import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { GameModel } from "./game.model";
import { GameService } from "./game.service";
import { AddGameInput } from "./game.dto";

// [ Done ] User can add games to collections
// [ Current ] - User can get games
// [ Todo ] - User can update which collections a game belongs
// [ Todo ] - User can remove a game from a collection

@Resolver(() => GameModel)
export class GameResolver {
	constructor(private gameService: GameService) {}

	@Mutation(() => String)
	async addGame(@Args("addGameData") addGameData: AddGameInput) {
		return await this.gameService.addGame(addGameData);
	}
}
