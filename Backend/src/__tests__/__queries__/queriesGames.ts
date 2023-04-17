import gql from 'graphql-tag';
import request from 'supertest-graphql';
import {
	IAddGame,
	IGetGames,
	IRemoveGame,
	IUpdateGame,
	ResponseAddGame,
	ResponseGetGames,
	ResponseRemoveGame,
	ResponseUpdateGame,
} from '../../interfaces/IGames';

export class QueriesGames {
	async addGame(url: string, variables: IAddGame) {
		const { data, errors } = await request<ResponseAddGame>(url)
			.mutate(ADD_GAME)
			.variables({ ...variables });

		const response = data?.addGame;
		const error = errors?.[0].message;

		return { response, error };
	}

	async getGames(url: string, variables: IGetGames) {
		const { data, errors } = await request<ResponseGetGames>(url)
			.mutate(GET_GAMES)
			.variables({ ...variables });

		const response = data?.getGames;
		const error = errors?.[0].message;

		return { response, error };
	}

	async updateGame(url: string, variables: IUpdateGame) {
		const { data, errors } = await request<ResponseUpdateGame>(url)
			.mutate(UPDATE_GAME)
			.variables({ ...variables });

		const response = data?.updateGame;
		const error = errors?.[0].message;

		return { response, error };
	}

	async removeGame(url: string, variables: IRemoveGame) {
		const { data, errors } = await request<ResponseRemoveGame>(url)
			.mutate(REMOVE_GAME)
			.variables({ ...variables });

		const response = data?.removeGame;
		const error = errors?.[0].message;

		return { response, error };
	}
}

const ADD_GAME = gql`
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

const GET_GAMES = gql`
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

const UPDATE_GAME = gql`
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

const REMOVE_GAME = gql`
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
