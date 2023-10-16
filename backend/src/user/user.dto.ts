import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, Length, MinLength } from "class-validator";
import { Transform } from "class-transformer";

@InputType()
export class CreateUserInput {
	@Transform((prop) => String(prop.value).toLowerCase())
	@IsEmail()
	@Field(() => String)
	email: string;

	@Transform((prop) => String(prop.value).toLowerCase().trim())
	@Length(3, 30)
	@Field(() => String)
	name: string;

	@MinLength(10)
	@Field(() => String)
	password: string;
}
