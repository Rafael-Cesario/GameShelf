import { IAddMarker, IMarker, IUpdateMarker } from '@/interfaces/IMarkers';
import { graphql } from 'msw';

const markers: IMarker[] = [
	{ name: 'marker01', filters: { tags: [], genre: [], rate: '' } },
	{ name: 'marker02', filters: { tags: [], genre: [], rate: '' } },
	{ name: 'marker03', filters: { tags: [], genre: [], rate: '' } },
];

export const queriesMarkers = [
	graphql.query('GetMarkers', (req, res, ctx) => {
		return res(ctx.data({ getMarkers: { markers } }));
	}),

	graphql.mutation('AddMarker', (req, res, ctx) => {
		const { addMarker } = req.variables as IAddMarker;
		const { name, filters } = addMarker;
		markers.push({ name, filters });
		return res(ctx.data({ addMarker: { newMarkers: markers } }));
	}),

	graphql.mutation('UpdateMarker', (req, res, ctx) => {
		const { updateMarker } = req.variables as IUpdateMarker;
		return res(ctx.data({ updateMarker: { newMarker: updateMarker.update } }));
	}),
];
