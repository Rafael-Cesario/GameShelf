import { IAddGame, IGetGames, IUpdateGame, ResponseAddGame, ResponseGetGames, ResponseUpdateGame } from '@/interfaces/IGames';
import { client } from '@/services/client';
import { TypesQueriesGames } from '@/services/queries/games';
import { useMutation } from '@apollo/client';

export const useGames = () => {
	const typesQueriesGames = new TypesQueriesGames();

	const [mutationAddGame] = useMutation<ResponseAddGame>(typesQueriesGames.ADD_GAME);
	const [mutationUpdateGame] = useMutation<ResponseUpdateGame>(typesQueriesGames.UPDATE_GAME);

	const queryGetGames = async (variables: IGetGames) => {
		const { data, errors } = await client.query<ResponseGetGames>({
			query: typesQueriesGames.GET_GAMES,
			variables,
		});

		return {
			data: data?.getGames.games,
			error: errors?.[0].message,
		};
	};

	const requestAddGame = async (variables: IAddGame) => {
		const { data, errors } = await mutationAddGame({ variables });

		return {
			data: data?.addGame.newGames,
			error: errors?.[0].message,
		};
	};

	const requestUpdateGame = async (variables: IUpdateGame) => {
		const { data, errors } = await mutationUpdateGame({ variables });

		return {
			data: data?.updateGame.newGames,
			error: errors?.[0].message,
		};
	};

	return { queryGetGames, requestAddGame, requestUpdateGame };
};
