import gql from "graphql-tag";

class GameQueries {
	ADD_GAME = gql`
		mutation AddGame($addGameData: AddGameInput!) {
			addGame(addGameData: $addGameData)
		}
	`;
}

export const gameQueries = new GameQueries();
