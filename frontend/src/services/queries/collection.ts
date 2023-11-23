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

	GET_COLLECTIONS = gql`
		query GetCollections($userID: String!) {
			getCollections(userID: $userID) {
				id
				name
				userID
				games {
					background_image
					id
					name
					rating
					released
					userID
				}
			}
		}
	`;
}

export const collectionQueries = new CollectionQueries();
