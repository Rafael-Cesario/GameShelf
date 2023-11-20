import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class AddGameInput {
	@IsString()
	@Field()
	userID: string;

	@IsString()
	@Field()
	id: string;

	@Field(() => [CollectionInput])
	collections: CollectionInput[];
}

@InputType()
class CollectionInput {
	@IsString()
	@Field()
	id: string;
}
