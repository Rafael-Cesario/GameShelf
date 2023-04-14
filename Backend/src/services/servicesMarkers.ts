import { GraphQLError } from 'graphql';
import { IAddMarker } from '../interfaces/interfacesMarkers';
import { searchForEmptyValues } from '../utils/emptyValues';
import { Errors } from '../interfaces/interfaceResponses';
import { ModelMarkers } from '../models/modelMarkers';

export class ServicesMarkers {
	async addMarker({ addMarker }: IAddMarker) {
		const { name, email } = addMarker;

		const hasEmptyValues = searchForEmptyValues(addMarker);
		if (hasEmptyValues) throw new GraphQLError(`${Errors.emptyVariable}${hasEmptyValues}`);

		let user = await ModelMarkers.findOne({ email });
		user ||= await ModelMarkers.create({ email, markers: [], filters: [] });

		const hasMarker = user.markers.includes(name);
		if (hasMarker) throw new GraphQLError(Errors.duplicatedMarker);

		user.markers.push(name);
		await user.save();

		return { newMarkers: user.markers };
	}
}
