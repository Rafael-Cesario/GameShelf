import gql from 'graphql-tag';

export const typedefsGames = gql`
	type Game {
		name: String!
		release: String!
		tags: [String]!
		genre: [String]!
		rate: String!
		cover: String!
	}

	type ResponseGetGames {
		games: [Game]!
	}

	type ResponseAddGame {
		newGames: [Game]!
	}

	type ResponseRemoveGame {
		newGames: [Game]!
	}

	type ResponseUpdateGame {
		newGames: [Game]!
	}

	input IAddGame {
		email: String!
		game: IGame!
	}

	input IGame {
		name: String!
		release: String!
		tags: [String]!
		genre: [String]!
		rate: String!
		cover: String!
	}

	input IRemoveGame {
		email: String!
		gameName: String!
	}

	input IUpdateGame {
		email: String!
		gameName: String!
		update: IGame!
	}

	type Query {
		getGames(email: String!): ResponseGetGames!
	}

	type Mutation {
		addGame(addGame: IAddGame!): ResponseAddGame!
		updateGame(updateGame: IUpdateGame!): ResponseUpdateGame!
		removeGame(removeGame: IRemoveGame!): ResponseRemoveGame!
	}
`;
