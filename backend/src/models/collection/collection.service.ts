import { PrismaService } from "src/prisma.service";
import { CreateCollectionInput, UpdateCollectionInput } from "./collection.dto";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class CollectionService {
	constructor(private prisma: PrismaService) {}

	async createCollection(createCollectionData: CreateCollectionInput) {
		const { userID, name } = createCollectionData;

		const user = await this.prisma.user.findUnique({ where: { id: userID }, include: { collections: true } });
		if (!user) throw new BadRequestException("notFound: User ID not found");

		const isDuplicated = !!user.collections.find((collection) => collection.name === name);
		if (isDuplicated) throw new BadRequestException("duplicated: A collection with the same name already exist.");

		const collection = await this.prisma.collection.create({ data: { name, userID } });
		return collection;
	}

	async getCollections(userID: string) {
		const user = await this.prisma.user.findUnique({ where: { id: userID }, include: { collections: { include: { games: { include: { collections: true } } } } } });
		if (!user) throw new BadRequestException("notFound: User ID not found");

		return user.collections;
	}

	async updateCollection(updateCollectionData: UpdateCollectionInput) {
		const { id, name } = updateCollectionData;
		const hasCollection = await this.prisma.collection.findUnique({ where: { id } });
		if (!hasCollection) throw new BadRequestException("notFound: collections not found");

		const collection = await this.prisma.collection.update({ where: { id }, data: { name }, include: { games: { include: { collections: true } } } });
		return collection;
	}

	async deleteCollection(collectionID: string) {
		const hasCollection = await this.prisma.collection.findUnique({ where: { id: collectionID } });
		if (!hasCollection) throw new BadRequestException("notFound: collections not found");

		const { name } = await this.prisma.collection.delete({ where: { id: collectionID } });
		return `${name[0].toUpperCase() + name.slice(1)} was deleted from database.`;
	}
}
