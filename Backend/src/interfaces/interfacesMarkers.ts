export interface IAddMarker {
	addMarker: {
		email: string;
		name: string;
	};
}

export interface ResponseAddMarker {
	addMarker: {
		newMarkers: string[];
	};
}
