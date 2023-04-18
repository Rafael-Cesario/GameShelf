import { IGetMarkers, ResponseGetMarkers } from '@/interfaces/IMarkers';
import { client } from '@/services/client';
import { TypesQueriesMarkers } from '@/services/queries/markers';

export const useMarkers = () => {
	const typesQueriesMarkers = new TypesQueriesMarkers();

	const queryGetMarkers = async (variables: IGetMarkers) => {
		const { data } = await client.query<ResponseGetMarkers>({
			query: typesQueriesMarkers.GET_MARKERS,
			variables: { ...variables },
		});

		return data?.getMarkers.markers;
	};

	return { queryGetMarkers };
};
