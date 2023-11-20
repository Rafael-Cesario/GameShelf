import { ObjectType, Field } from "@nestjs/graphql";
import { CollectionModel } from "../collection/collection.model";

@ObjectType()
export class GameModel {
	@Field()
	userID: string;

	@Field()
	id: string;

	@Field(() => [CollectionModel])
	collections: CollectionModel[];
}
