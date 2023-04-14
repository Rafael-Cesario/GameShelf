import { IAddMarker } from '../../interfaces/interfacesMarkers';
import { ServicesMarkers } from '../../services/servicesMarkers';

const servicesMarkers = new ServicesMarkers();

export const resolversMarkers = {
	Mutation: {
		addMarker: (parent: never, variables: IAddMarker) => servicesMarkers.addMarker(variables),
	},
};
