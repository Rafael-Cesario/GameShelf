export interface IAddMarker {
	addMarker: {
		email: string;
		name: string;
		filters: {
			tags: string[];
			genre: string[];
			rate: string[];
		};
	};
}

export interface ResponseAddMarker {
	addMarker: {
		newMarkers: string[];
	};
}

export interface IGetMarkers {
	email: string;
}
