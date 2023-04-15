import { GraphQLError, graphql } from 'graphql';
import { IAddMarker, IDeleteMarker, IGetMarkers, IUpdateMarker } from '../interfaces/interfacesMarkers';
import { searchForEmptyValues } from '../utils/emptyValues';
import { Errors, Success } from '../interfaces/interfaceResponses';
import { ModelMarkers } from '../models/modelMarkers';

export class ServicesMarkers {
	async getMarkers({ email }: IGetMarkers) {
		if (!email) throw new GraphQLError(`${Errors.emptyVariable}Email was not provided`);
		const user = await ModelMarkers.findOne({ email });
		const markers = { markers: user ? user.markers : [] };
		return markers;
	}

	async addMarker({ addMarker }: IAddMarker) {
		const { email, name, filters } = addMarker;

		const hasEmptyValues = searchForEmptyValues(addMarker);
		if (hasEmptyValues) throw new GraphQLError(`${Errors.emptyVariable}${hasEmptyValues}`);

		let user = await ModelMarkers.findOne({ email });
		user ||= await ModelMarkers.create({ email, markers: [] });

		const hasMarker = user.markers.filter((marker) => marker.name === name);
		if (hasMarker.length) throw new GraphQLError(Errors.duplicatedMarker);

		user.markers.push({ name, filters });
		await user.save();

		return { newMarkers: user.markers };
	}

	async updateMarker({ updateMarker }: IUpdateMarker) {
		const { email, name, update } = updateMarker;

		const hasEmptyValues = searchForEmptyValues(updateMarker);
		if (hasEmptyValues) throw new GraphQLError(`${Errors.emptyVariable}${hasEmptyValues}`);

		const user = await ModelMarkers.findOne({ email });
		if (!user) throw new GraphQLError(Errors.userNotFound);

		const markerIndex = user.markers.findIndex((marker) => marker.name === name);
		if (markerIndex < 0) throw new GraphQLError(Errors.markerNotFound);

		const marker = user.markers[markerIndex];
		marker.name = update.name || marker.name;
		marker.filters = update.filters;
		user.markers[markerIndex] = marker;

		await user.save();
		return { newMarker: marker };
	}

	async deleteMarker({ deleteMarker }: IDeleteMarker) {
		const hasEmptyValues = searchForEmptyValues(deleteMarker);
		if (hasEmptyValues) throw new GraphQLError(Errors.emptyVariable + hasEmptyValues);

		const { email, name } = deleteMarker;

		const user = await ModelMarkers.findOne({ email });
		if (!user) throw new GraphQLError(Errors.userNotFound);

		const markerIndex = user.markers.findIndex((marker) => marker.name === name);
		if (markerIndex < 0) throw new GraphQLError(Errors.markerNotFound);

		user.markers.splice(markerIndex, 1);
		await user.save();

		return { message: `${Success.markerDeleted} Marker ${name} was deleted` };
	}
}
