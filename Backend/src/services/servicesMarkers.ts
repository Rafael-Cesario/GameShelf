import { GraphQLError } from 'graphql';
import { IAddMarker } from '../interfaces/interfacesMarkers';
import { searchForEmptyValues } from '../utils/emptyValues';
import { Errors } from '../interfaces/interfaceResponses';
import { ModelMarkers } from '../models/modelMarkers';

export class ServicesMarkers {
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
}
