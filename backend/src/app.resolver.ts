import { Query, Resolver } from "@nestjs/graphql";
import { PrismaService } from "./database/prisma.service";

@Resolver()
export class AppResolver {
	constructor(private prisma: PrismaService) {}

	@Query(() => String)
	async hello() {
		const user = { email: "user01@email.com", name: "user01", password: "123" };
		await this.prisma.user.create({ data: user });

		const users = await this.prisma.user.findMany({});
		console.log({ users });

		return "Hello GameShelf";
	}
}
