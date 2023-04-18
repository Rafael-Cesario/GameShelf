import { IMarker } from '@/interfaces/IMarkers';

export const getAllFilters = (markers: IMarker[]) => {
	const tags: string[] = [];
	const genres: string[] = [];

	markers.forEach((marker) => {
		tags.push(...marker.filters.tags);
		genres.push(...marker.filters.genre);
	});

	return { tags: Array.from(new Set(tags)), genres: Array.from(new Set(genres)) };
};
