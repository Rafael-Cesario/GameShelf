import { gql } from '@apollo/client';

export class TypesQueriesMarkers {
	ADD_MARKER = gql`
		mutation AddMarker($addMarker: IAddMarker!) {
			addMarker(addMarker: $addMarker) {
				newMarkers {
					name
					filters {
						tags
						genre
						rate
					}
				}
			}
		}
	`;

	GET_MARKERS = gql`
		query GetMarkers($email: String!) {
			getMarkers(email: $email) {
				markers {
					name
					filters {
						tags
						genre
						rate
					}
				}
			}
		}
	`;

	UPDATE_MARKER = gql`
		mutation UpdateMarker($updateMarker: IUpdateMarker!) {
			updateMarker(updateMarker: $updateMarker) {
				newMarker {
					name
					filters {
						tags
						genre
						rate
					}
				}
			}
		}
	`;

	DELETE_MARKER = gql`
		mutation DeleteMarker($deleteMarker: IDeleteMarker!) {
			deleteMarker(deleteMarker: $deleteMarker) {
				message
			}
		}
	`;
}
