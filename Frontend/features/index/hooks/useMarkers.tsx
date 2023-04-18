import { IGetMarkers } from '@/interfaces/IMarkers';
import { client } from '@/services/client';
import { TypesQueriesMarkers } from '@/services/queries/markers';

export const useMarkers = () => {
	const typesQueriesMarkers = new TypesQueriesMarkers();

	const getMarkers = async (variables: IGetMarkers) => {
		const { data } = await client.query({
			query: typesQueriesMarkers.GET_MARKERS,
			variables: { ...variables },
		});

		console.log({ data });

		return;
	};

	return { getMarkers };
};
