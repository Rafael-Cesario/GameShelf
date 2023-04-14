import { IAddMarker, IGetMarkers, IUpdateMarker } from '../../interfaces/interfacesMarkers';
import { ServicesMarkers } from '../../services/servicesMarkers';

const servicesMarkers = new ServicesMarkers();

export const resolversMarkers = {
	Query: {
		getMarkers: (parent:never, variables: IGetMarkers) => servicesMarkers.getMarkers(variables),
	},

	Mutation: {
		addMarker: (parent: never, variables: IAddMarker) => servicesMarkers.addMarker(variables),
		updateMarker:(parent:never, variables: IUpdateMarker) => servicesMarkers.updateMarker(variables),
	},
};
