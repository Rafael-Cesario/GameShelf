import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { Credentials, User } from "./user.model";
import { CreateUserInput, LoginInput } from "./user.dto";

@Resolver("User")
export class UserResolver {
	constructor(private userService: UserService) {}

	@Mutation(() => User)
	async createUser(@Args("createUserData") createUserData: CreateUserInput) {
		return await this.userService.createUser(createUserData);
	}

	@Mutation(() => Credentials)
	async login(@Args("loginData") loginData: LoginInput) {
		return await this.userService.login(loginData);
	}
}
