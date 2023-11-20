import { InputType, Field, PickType } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsString, Length } from "class-validator";

@InputType()
export class CreateCollectionInput {
	@IsString()
	@Field()
	userID: string;

	@Length(3, 20)
	@Transform(({ value }) => String(value).toLowerCase())
	@Field()
	name: string;
}

@InputType()
export class UpdateCollectionInput extends PickType(CreateCollectionInput, ["name"]) {
	@IsString()
	@Field()
	id: string;
}
