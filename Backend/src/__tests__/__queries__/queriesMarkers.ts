import request from 'supertest-graphql';
import {
	IAddMarker,
	IDeleteMarker,
	IGetMarkers,
	IUpdateMarker,
	ResponseAddMarker,
	ResponseDeleteMarker,
	ResponseGetMarkers,
	ResponseUpdateMarker,
} from '../../interfaces/interfacesMarkers';
import gql from 'graphql-tag';

export class QueriesMarkers {
	async addMarker(url: string, variables: IAddMarker) {
		const { data, errors } = await request<ResponseAddMarker>(url)
			.mutate(ADD_MARKER)
			.variables({ ...variables });

		const response = data?.addMarker;
		const error = errors?.[0].message;
		return { response, error };
	}

	async getMarkers(url: string, variables: IGetMarkers) {
		const { data, errors } = await request<ResponseGetMarkers>(url)
			.query(GET_MARKERS)
			.variables({ ...variables });

		const response = data?.getMarkers;
		const error = errors?.[0].message;
		return { response, error };
	}

	async updateMarker(url: string, variables: IUpdateMarker) {
		const { data, errors } = await request<ResponseUpdateMarker>(url)
			.mutate(UPDATE_MARKER)
			.variables({ ...variables });

		const response = data?.updateMarker;
		const error = errors?.[0].message;
		return { response, error };
	}

	async deleteMarker(url: string, variables: IDeleteMarker) {
		const { data, errors } = await request<ResponseDeleteMarker>(url)
			.mutate(DELETE_MARKER)
			.variables({ ...variables });

		const response = data?.deleteMarker;
		const error = errors?.[0].message;
		return { response, error };
	}
}

const ADD_MARKER = gql`
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

const GET_MARKERS = gql`
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

const UPDATE_MARKER = gql`
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

const DELETE_MARKER = gql`
	mutation DeleteMarker($deleteMarker: IDeleteMarker!) {
		deleteMarker(deleteMarker: $deleteMarker) {
			message
		}
	}
`;
