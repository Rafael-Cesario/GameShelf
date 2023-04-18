import { graphql } from 'msw';

export const queriesMarkers = [
	graphql.query('GetMarkers', (req, res, ctx) => {
		const markers = [
			{ name: 'marker01', filters: { tags: [], genre: [], rate: '' } },
			{ name: 'marker02', filters: { tags: [], genre: [], rate: '' } },
			{ name: 'marker03', filters: { tags: [], genre: [], rate: '' } },
		];

		return res(ctx.data({ getMarkers: { markers } }));
	}),
];
