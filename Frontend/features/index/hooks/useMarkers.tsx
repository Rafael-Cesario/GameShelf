import { IAddMarker, IGetMarkers, ResponseAddMarker, ResponseGetMarkers } from '@/interfaces/IMarkers';
import { client } from '@/services/client';
import { TypesQueriesMarkers } from '@/services/queries/markers';
import { useMutation } from '@apollo/client';

export const useMarkers = () => {
	const typesQueriesMarkers = new TypesQueriesMarkers();

	const [mutationAddMarker] = useMutation<ResponseAddMarker>(typesQueriesMarkers.ADD_MARKER);

	const queryGetMarkers = async (variables: IGetMarkers) => {
		const { data } = await client.query<ResponseGetMarkers>({
			query: typesQueriesMarkers.GET_MARKERS,
			variables: { ...variables },
		});

		return data?.getMarkers.markers;
	};

	const queryAddMarker = async (variables: IAddMarker) => {
		const { data, errors } = await mutationAddMarker({ variables });

		return {
			newMarkers: data?.addMarker.newMarkers,
			error: errors?.[0].message,
		};
	};

	return { queryGetMarkers, queryAddMarker };
};
