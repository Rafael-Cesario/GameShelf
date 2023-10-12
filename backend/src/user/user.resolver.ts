import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./user.model";
import { CreateUserInput } from "./user.dto";

@Resolver("User")
export class UserResolver {
	constructor(private userService: UserService) {}

	@Mutation(() => User)
	async createUser(@Args("createUserData") createUserData: CreateUserInput) {
		return await this.userService.createUser(createUserData);
	}
}
