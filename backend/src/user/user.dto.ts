import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, Length, MinLength } from "class-validator";
import { Transform } from "class-transformer";
import { encryptPassword } from "src/utils/crypt";

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

	@Transform((prop) => encryptPassword(prop.value))
	@MinLength(10)
	@Field(() => String)
	password: string;
}
