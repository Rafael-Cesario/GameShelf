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

	type Query {
		getMarkers(email: String!): ResponseGetMarkers!
	}

	type Mutation {
		addMarker(addMarker: IAddMarker!): ResponseAddMarker!
	}
`;
