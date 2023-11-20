import gql from "graphql-tag";

class CollectionQueries {
	CREATE_COLLECTION = gql`
		mutation CreateCollection($createCollectionData: CreateCollectionInput!) {
			createCollection(createCollectionData: $createCollectionData) {
				id
				name
				userID
			}
		}
	`;
}

export const collectionQueries = new CollectionQueries();
