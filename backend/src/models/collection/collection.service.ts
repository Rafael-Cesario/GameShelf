import { PrismaService } from "src/prisma.service";
import { CreateCollectionInput } from "./collection.dto";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class CollectionService {
	constructor(private prisma: PrismaService) {}

	async createCollection(createCollectionData: CreateCollectionInput) {
		const { userID, name } = createCollectionData;

		const user = await this.prisma.user.findUnique({ where: { id: userID }, include: { Collection: true } });
		if (!user) throw new BadRequestException("notFound: User ID not found");

		const isDuplicated = !!user.Collection.find((collection) => collection.name === name);
		if (isDuplicated) throw new BadRequestException("duplicated: A collection with the same name already exist.");

		const collection = await this.prisma.collection.create({ data: { name, userID } });
		return collection;
	}

	async getCollections(userID: string) {
		const user = await this.prisma.user.findUnique({ where: { id: userID }, include: { Collection: { include: { games: true } } } });
		if (!user) throw new BadRequestException("notFound: User ID not found");

		return user.Collection;
	}
}
