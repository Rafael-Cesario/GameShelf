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

	GET_COLLECTIONS = gql`
		query GetCollections($userID: String!) {
			getCollections(userID: $userID) {
				id
				name
				userID
				games {
					id
				}
			}
		}
	`;

	UPDATE_COLLECTION = gql`
		mutation UpdateCollection($updateCollectionData: UpdateCollectionInput!) {
			updateCollection(updateCollectionData: $updateCollectionData) {
				id
				name
				userID
				games {
					id
				}
			}
		}
	`;

	DELETE_COLLECTION = gql`
		mutation DeleteCollection($collectionID: String!) {
			deleteCollection(collectionID: $collectionID)
		}
	`;
}

export const collectionQueries = new CollectionQueries();
