import gql from 'graphql-tag';

export const typedefsMarkers = gql`
	# type Games {
	# 	user: String!
	# 	markers: [String]!
	# 	games: [String]!
	# }

	# type Game {
	# 	name: String!
	# 	genre: String!
	# 	rate: String!
	# 	release: String!
	# 	category: [String]!
	# 	tags: [String]!
	# }

	type ResponseAddMarker {
		newMarkers: [String]!
	}

	input AddMarker {
		email: String!
		name: String!
	}

	type Mutation {
		addMarker(addMarker: AddMarker!): ResponseAddMarker!
	}
`;
