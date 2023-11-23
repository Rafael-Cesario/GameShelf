import gql from "graphql-tag";

class GameQueries {
	GET_GAMES = gql`
		query GetGames($userID: String!) {
			getGames(userID: $userID) {
				userID
				id
				collections {
					userID
					id
					name
				}
			}
		}
	`;

	ADD_GAME = gql`
		mutation AddGame($addGameData: AddGameInput!) {
			addGame(addGameData: $addGameData)
		}
	`;
}

export const gameQueries = new GameQueries();
