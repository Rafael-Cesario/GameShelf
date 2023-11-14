import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { LoginModel, UserModel } from "./user.model";
import { UserService } from "./user.service";
import { CreateUserInput, LoginInput } from "./user.dto";

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

	@Mutation(() => LoginModel)
	async login(@Args("loginData") loginData: LoginInput) {
		return this.userService.login(loginData);
	}
}
