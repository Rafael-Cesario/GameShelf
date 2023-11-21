import gql from "graphql-tag";

class GameQueries {
	ADD_GAME = gql`
		mutation AddGame($addGameData: AddGameInput!) {
			addGame(addGameData: $addGameData)
		}
	`;

	GET_GAMES = gql`
		query GetGames($userID: String!) {
			getGames(userID: $userID) {
				id
				userID
				collections {
					id
					name
				}
			}
		}
	`;

	UPDATE_GAME = gql`
		mutation UpdateGame($updateGameData: UpdateGameInput!) {
			updateGame(updateGameData: $updateGameData) {
				id
				userID
				collections {
					id
					name
				}
			}
		}
	`;

	REMOVE_GAME = gql`
		mutation RemoveGame($gameID: String!) {
			removeGame(gameID: $gameID)
		}
	`;
}

export const gameQueries = new GameQueries();
