import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
	@Field(() => String)
	id: string;

	@Field(() => String)
	email: string;

	@Field(() => String)
	name: string;
}

@ObjectType()
export class Credentials extends User {
	@Field(() => String)
	token: string;
}
