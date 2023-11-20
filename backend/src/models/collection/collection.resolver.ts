import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { CollectionModel } from "./collection.model";
import { CreateCollectionInput, UpdateCollectionInput } from "./collection.dto";
import { CollectionService } from "./collection.service";

@Resolver(() => CollectionModel)
export class CollectionResolver {
	constructor(private collectionService: CollectionService) {}

	@Mutation(() => CollectionModel)
	async createCollection(@Args("createCollectionData") createCollectionData: CreateCollectionInput) {
		return await this.collectionService.createCollection(createCollectionData);
	}

	@Query(() => [CollectionModel])
	async getCollections(@Args("userID") userID: string) {
		return await this.collectionService.getCollections(userID);
	}

	@Mutation(() => CollectionModel)
	async updateCollection(@Args("updateCollectionData") updateCollectionData: UpdateCollectionInput) {
		return await this.collectionService.updateCollection(updateCollectionData);
	}
}
