export interface IMarker {
	name: string;
	filters: {
		tags: string[];
		genre: string[];
		rate: string;
	};
}

export interface IAddMarker {
	addMarker: {
		email: string;
		name: string;
		filters: {
			tags: string[];
			genre: string[];
			rate: string;
		};
	};
}

export interface ResponseAddMarker {
	addMarker: {
		newMarkers: IMarker[];
	};
}

export interface IGetMarkers {
	email: string;
}

export interface ResponseGetMarkers {
	getMarkers: {
		markers: IMarker[];
	};
}

export interface IUpdateMarker {
	updateMarker: {
		email: string;
		name: string;
		update: IMarker;
	};
}

export interface ResponseUpdateMarker {
	updateMarker: {
		newMarker: IMarker;
	};
}

export interface IDeleteMarker {
	deleteMarker: {
		email: string;
		name: string;
	};
}

export interface ResponseDeleteMarker {
	deleteMarker: {
		message: string;
	};
}
