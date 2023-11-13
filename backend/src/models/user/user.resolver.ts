import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { UserModel } from "./user.model";
import { UserService } from "./user.service";
import { CreateUserInput } from "./user.dto";

@Resolver(() => UserModel)
export class UserResolver {
	constructor(private userService: UserService) {}

	@Query(() => String)
	hello() {
		return "Hello User";
	}

	@Mutation(() => String)
	async createUser(@Args("createUserData") createUserData: CreateUserInput) {
		return this.userService.createUser(createUserData);
	}
}
