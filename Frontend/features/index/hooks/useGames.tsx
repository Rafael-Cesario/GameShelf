import { IGetGames, ResponseGetGames } from '@/interfaces/IGames';
import { client } from '@/services/client';
import { TypesQueriesGames } from '@/services/queries/games';

export const useGames = () => {
	const typesQueriesGames = new TypesQueriesGames();

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

	return { queryGetGames };
};
