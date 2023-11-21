import gql from "graphql-tag";

class CollectionQueries {
	CREATE_COLLECTION = gql`
		mutation CreateCollection($createCollectionData: CreateCollectionInput!) {
			createCollection(createCollectionData: $createCollectionData) {
				userID
				id
				name
			}
		}
	`;
}

export const collectionQueries = new CollectionQueries();
