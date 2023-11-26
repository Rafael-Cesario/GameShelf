import { Field, Float, InputType, Int } from "@nestjs/graphql";
import { IsNumber, IsString } from "class-validator";

@InputType()
export class AddGameInput {
	@IsString()
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

	@Field(() => [CollectionInput])
	collections: CollectionInput[];
}

@InputType()
class CollectionInput {
	@IsString()
	@Field()
	id: string;
}

@InputType()
export class UpdateGameInput {
	@IsNumber()
	@Field(() => Int)
	gameID: number;

	@Field(() => [CollectionInput], { nullable: "items" })
	addCollections?: CollectionInput[];

	@Field(() => [CollectionInput], { nullable: "items" })
	removeCollections?: CollectionInput[];
}
