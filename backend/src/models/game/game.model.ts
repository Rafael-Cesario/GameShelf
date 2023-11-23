import { ObjectType, Field, Int, Float } from "@nestjs/graphql";
import { CollectionModel } from "../collection/collection.model";

@ObjectType()
export class GameModel {
	@Field()
	userID: string;

	@Field(() => Int)
	id: number;

	@Field()
	name: string;

	@Field()
	released: string;

	@Field()
	background_image: string;

	@Field(() => Float)
	rating: number;

	@Field(() => [CollectionModel])
	collections: CollectionModel[];
}
