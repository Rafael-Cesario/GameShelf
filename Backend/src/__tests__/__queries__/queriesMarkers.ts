import request from 'supertest-graphql';
import { IAddMarker, ResponseAddMarker } from '../../interfaces/interfacesMarkers';
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
