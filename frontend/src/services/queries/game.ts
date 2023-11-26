import gql from "graphql-tag";

class GameQueries {
	GET_GAMES = gql`
		query GetGames($userID: String!) {
			getGames(userID: $userID) {
				background_image
				id
				name
				rating
				released
				userID
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

	UPDATE_GAME = gql`
		mutation UpdateGame($updateGameData: UpdateGameInput!) {
			updateGame(updateGameData: $updateGameData) {
				userID
				id
				name
				released
				background_image
				rating
				collections {
					id
					name
				}
			}
		}
	`;
}

export const gameQueries = new GameQueries();
