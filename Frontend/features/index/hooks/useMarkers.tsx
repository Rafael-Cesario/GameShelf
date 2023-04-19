import { IAddMarker, IGetMarkers, IUpdateMarker, ResponseAddMarker, ResponseGetMarkers, ResponseUpdateMarker } from '@/interfaces/IMarkers';
import { client } from '@/services/client';
import { TypesQueriesMarkers } from '@/services/queries/markers';
import { useMutation } from '@apollo/client';

export const useMarkers = () => {
	const typesQueriesMarkers = new TypesQueriesMarkers();

	const [mutationAddMarker] = useMutation<ResponseAddMarker>(typesQueriesMarkers.ADD_MARKER);
	const [mutationUpdateMarker] = useMutation<ResponseUpdateMarker>(typesQueriesMarkers.UPDATE_MARKER);

	const queryGetMarkers = async (variables: IGetMarkers) => {
		const { data } = await client.query<ResponseGetMarkers>({
			query: typesQueriesMarkers.GET_MARKERS,
			variables: { ...variables },
		});

		return data?.getMarkers.markers;
	};

	const requestAddMarker = async (variables: IAddMarker) => {
		const { data, errors } = await mutationAddMarker({ variables });

		return {
			newMarkers: data?.addMarker.newMarkers,
			error: errors?.[0].message,
		};
	};

	const requestUpdateMarker = async (variables: IUpdateMarker) => {
		const { data, errors } = await mutationUpdateMarker({ variables });

		return {
			newMarker: data?.updateMarker.newMarker,
			error: errors?.[0].message,
		};
	};

	return { queryGetMarkers, requestAddMarker, requestUpdateMarker };
};
