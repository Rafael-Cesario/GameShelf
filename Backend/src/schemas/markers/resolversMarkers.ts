import { IAddMarker, IDeleteMarker, IGetMarkers, IUpdateMarker } from '../../interfaces/IMarkers';
import { ServicesMarkers } from '../../services/servicesMarkers';

const servicesMarkers = new ServicesMarkers();

export const resolversMarkers = {
	Query: {
		getMarkers: (parent: never, variables: IGetMarkers) => servicesMarkers.getMarkers(variables),
	},

	Mutation: {
		addMarker: (parent: never, variables: IAddMarker) => servicesMarkers.addMarker(variables),
		updateMarker: (parent: never, variables: IUpdateMarker) => servicesMarkers.updateMarker(variables),
		deleteMarker: (parent: never, variables: IDeleteMarker) => servicesMarkers.deleteMarker(variables),
	},
};
