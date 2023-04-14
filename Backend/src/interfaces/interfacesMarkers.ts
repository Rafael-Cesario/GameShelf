interface Marker {
	name: string;
	filters: {
		tags: string[];
		genre: string[];
		rate: string[];
	};
}

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

export interface ResponseGetMarkers {
	getMarkers: {
		markers: string[];
	};
}

export interface IUpdateMarker {
	updateMarker: {
		email: string;
		name: string;
		update: Marker;
	};
}

export interface ResponseUpdateMarker {
	newMarker: Marker;
}
