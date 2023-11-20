import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { CollectionModel } from "./collection.model";
import { CreateCollectionInput } from "./collection.dto";
import { CollectionService } from "./collection.service";

@Resolver(() => CollectionModel)
export class CollectionResolver {
	constructor(private collectionService: CollectionService) {}

	@Mutation(() => CollectionModel)
	async createCollection(@Args("createCollectionData") createCollectionData: CreateCollectionInput) {
		return await this.collectionService.createCollection(createCollectionData);
	}
}
