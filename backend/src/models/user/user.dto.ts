import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, MinLength } from "class-validator";
import { Transform } from "class-transformer";

@InputType()
export class CreateUserInput {
	@IsEmail()
	@Transform(({ value }) => String(value).toLowerCase())
	@Field()
	email: string;

	@MinLength(10)
	@Field()
	password: string;
}

@InputType()
export class LoginInput {
	@Field()
	email: string;

	@Field()
	password: string;
}
