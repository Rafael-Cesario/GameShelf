import mongoose from 'mongoose';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { startServer } from '../server';
import { startDatabase } from '../database';
import { ModelMarkers } from '../models/modelMarkers';
import { QueriesMarkers } from './__queries__/queriesMarkers';
import { IMarker } from '../interfaces/IMarkers';
import { Success } from '../interfaces/IResponses';

describe('Markers', () => {
	const queriesMarkers = new QueriesMarkers();
	const defaultUser = { email: 'qwe@qwe.com' };
	let url: string;

	beforeAll(async () => {
		url = await startServer(0);
		await startDatabase();
	});

	afterEach(async () => {
		await ModelMarkers.deleteMany({});
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});

	describe('Add markers', () => {
		it('Add a new marker', async () => {
			const marker = { name: 'marker01', filters: { tags: ['tag01'], genre: ['genre01'], rate: ['rate01'] } };
			const { response } = await queriesMarkers.addMarker(url, {
				addMarker: { email: defaultUser.email, ...marker },
			});

			expect(response).toEqual({ newMarkers: [marker] });
		});

		it('throws a error, emptyVariables', async () => {
			const marker = { name: '', filters: { tags: [], genre: [], rate: [] } };
			const { error } = await queriesMarkers.addMarker(url, {
				addMarker: { email: '', ...marker },
			});

			expect(error).toMatch(/emptyVariable/);
		});

		it('Throws a error, duplicatedMarker', async () => {
			const marker = { name: 'helloAgain', filters: { tags: [], genre: [], rate: [] } };
			await queriesMarkers.addMarker(url, { addMarker: { email: defaultUser.email, ...marker } });

			const { error } = await queriesMarkers.addMarker(url, {
				addMarker: { email: defaultUser.email, ...marker },
			});

			expect(error).toMatch(/duplicatedMarker/);
		});
	});

	describe('Get markers', () => {
		it('return markers', async () => {
			const marker = { name: 'marker01', filters: { tags: [], genre: [], rate: [] } };
			await queriesMarkers.addMarker(url, { addMarker: { email: defaultUser.email, ...marker } });

			const { response } = await queriesMarkers.getMarkers(url, { email: defaultUser.email });

			expect(response?.markers.length).toBe(1);
			expect(response?.markers[0]).toEqual(marker);
		});

		it('Throws a error, emptyVariables', async () => {
			const { error } = await queriesMarkers.getMarkers(url, { email: '' });
			expect(error).toMatch(/emptyVariable/);
		});

		it('Returns a empty array', async () => {
			const { response } = await queriesMarkers.getMarkers(url, { email: defaultUser.email });
			expect(response?.markers).toEqual([]);
		});
	});

	describe('Update marker', () => {
		it('Update marker', async () => {
			const marker: IMarker = { name: 'marker01', filters: { genre: [], rate: [], tags: [] } };
			const newMarker: IMarker = { name: 'newName', filters: { tags: ['tag01'], rate: ['rate01'], genre: ['genre01'] } };

			await queriesMarkers.addMarker(url, { addMarker: { email: defaultUser.email, ...marker } });

			const { response } = await queriesMarkers.updateMarker(url, {
				updateMarker: {
					email: defaultUser.email,
					name: marker.name,
					update: newMarker,
				},
			});

			expect(response).toEqual({ newMarker });
		});
	});

	describe('Delete marker', () => {
		it('Delete a marker', async () => {
			const marker: IMarker = { name: 'marker01', filters: { genre: [], rate: [], tags: [] } };
			await queriesMarkers.addMarker(url, { addMarker: { email: defaultUser.email, ...marker } });

			const { response } = await queriesMarkers.deleteMarker(url, {
				deleteMarker: {
					email: defaultUser.email,
					name: marker.name,
				},
			});

			expect(response).toEqual({ message: Success.markerDeleted + ' Marker marker01 was deleted' });
		});
	});
});
