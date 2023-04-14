import mongoose from 'mongoose';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { startServer } from '../../server';
import { startDatabase } from '../../database';
import { ModelMarkers } from '../../models/modelMarkers';
import { QueriesMarkers } from '../__queries__/queriesMarkers';

describe('Add markers', () => {
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

	it('Add a new marker', async () => {
		const marker = { name: 'marker01', filters: { tags: ['tag01'], genre: ['genre01'], rate: ['rate01'] } };
		const { response } = await queriesMarkers.addMarker(url, {
			addMarker: { email: defaultUser.email, ...marker },
		});

		expect(response).toEqual({ newMarkers: [marker] });
	});
});
