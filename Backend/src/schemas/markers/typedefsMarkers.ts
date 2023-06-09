import gql from 'graphql-tag';

export const typedefsMarkers = gql`
	type Filters {
		tags: [String]!
		genre: [String]!
		rate: [String]!
	}

	type Marker {
		name: String!
		filters: Filters!
	}

	type ResponseAddMarker {
		newMarkers: [Marker]!
	}

	type ResponseGetMarkers {
		markers: [Marker]!
	}

	type ResponseUpdateMarker {
		newMarker: Marker!
	}

	type ResponseDeleteMarker {
		message: String!
	}

	input IFilters {
		tags: [String]!
		genre: [String]!
		rate: [String]!
	}

	input IAddMarker {
		email: String!
		name: String!
		filters: IFilters!
	}

	input IMarker {
		name: String!
		filters: IFilters!
	}

	input IUpdateMarker {
		email: String!
		name: String!
		update: IMarker!
	}

	input IDeleteMarker {
		email: String!
		name: String!
	}

	type Query {
		getMarkers(email: String!): ResponseGetMarkers!
	}

	type Mutation {
		addMarker(addMarker: IAddMarker!): ResponseAddMarker!
		updateMarker(updateMarker: IUpdateMarker!): ResponseUpdateMarker!
		deleteMarker(deleteMarker: IDeleteMarker!): ResponseDeleteMarker!
	}
`;
