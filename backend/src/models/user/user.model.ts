import { ObjectType, Field, PickType } from "@nestjs/graphql";

@ObjectType()
export class UserModel {
	@Field()
	id: string;

	@Field()
	email: string;

	@Field()
	password: string;
}

@ObjectType()
export class LoginModel extends PickType(UserModel, ["id", "email"]) {
	@Field()
	token: string;
}
