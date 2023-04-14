import mongoose from 'mongoose';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { IAddMarker } from '../../interfaces/interfacesMarkers';
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
		const variables: IAddMarker = { addMarker: { email: defaultUser.email, name: 'marker01' } };
		const { response } = await queriesMarkers.addMarker(url, variables);
		expect(response).toEqual({ newMarkers: ['marker01'] });
	});
});
