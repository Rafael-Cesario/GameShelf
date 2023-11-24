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

	UPDATE_COLLECTION = gql`
		mutation UpdateCollection($updateCollectionData: UpdateCollectionInput!) {
			updateCollection(updateCollectionData: $updateCollectionData) {
				userID
				id
				name
				games {
					userID
					id
					name
					released
					background_image
					rating
					collections {
						id
					}
				}
			}
		}
	`;
}

export const collectionQueries = new CollectionQueries();
