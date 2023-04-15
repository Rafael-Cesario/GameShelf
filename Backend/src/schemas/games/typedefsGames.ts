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

	type ResponseAddGames {
		game: Game!
	}

	type ResponseRemoveGames {
		newGames: [Game]!
	}

	type ResponseUpdateGame {
		updatedGame: Game!
	}

	input IAddGame {
		email: String!
		game: Game!
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

	input IGame {
		name: String!
		release: String!
		tags: [String]!
		genre: [String]!
		rate: String!
		cover: String!
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
