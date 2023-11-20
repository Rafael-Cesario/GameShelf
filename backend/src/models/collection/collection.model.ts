import { Field, ObjectType } from "@nestjs/graphql";
import { GameModel } from "../game/game.model";

@ObjectType()
export class CollectionModel {
	@Field()
	userID: string;

	@Field()
	id: string;

	@Field()
	name: string;

	@Field(() => [GameModel])
	games: GameModel[];
}
