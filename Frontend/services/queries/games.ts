import { gql } from '@apollo/client';

export class TypesQueriesGames {
	ADD_GAME = gql`
		mutation AddGame($addGame: IAddGame!) {
			addGame(addGame: $addGame) {
				newGames {
					cover
					genre
					name
					rate
					release
					tags
				}
			}
		}
	`;

	GET_GAMES = gql`
		query GetGames($email: String!) {
			getGames(email: $email) {
				games {
					cover
					genre
					name
					rate
					release
					tags
				}
			}
		}
	`;

	UPDATE_GAME = gql`
		mutation UpdateGame($updateGame: IUpdateGame!) {
			updateGame(updateGame: $updateGame) {
				newGames {
					cover
					genre
					name
					rate
					release
					tags
				}
			}
		}
	`;

	REMOVE_GAME = gql`
		mutation RemoveGame($removeGame: IRemoveGame!) {
			removeGame(removeGame: $removeGame) {
				newGames {
					cover
					genre
					name
					rate
					release
					tags
				}
			}
		}
	`;
}
