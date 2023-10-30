import { Query, Resolver } from "@nestjs/graphql";
import { PrismaService } from "./database/prisma.service";

@Resolver()
export class AppResolver {
	constructor(private prisma: PrismaService) {}

	@Query(() => String)
	async hello() {
		return "Hello GameShelf";
	}
}
