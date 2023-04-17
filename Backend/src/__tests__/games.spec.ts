import mongoose from 'mongoose';
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { startServer } from '../server';
import { startDatabase } from '../database';
import { ModelGames } from '../models/modelGames';
import { QueriesGames } from './__queries__/queriesGames';

describe('Games', () => {
	const defaultUser = { email: 'qwe@qwe' };
	const queriesGames = new QueriesGames();
	let url: string;

	const game = {
		name: 'new game',
		genre: ['genre01', 'genre02'],
		tags: ['tag01', 'tag02'],
		release: '17/04/2023',
		rate: 'great',
		cover: 'img link',
	};

	beforeAll(async () => {
		url = await startServer(0);
		await startDatabase();
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});

	afterEach(async () => {
		await ModelGames.deleteMany({});
	});

	it('add a new game', async () => {
		const { response } = await queriesGames.addGame(url, { addGame: { email: defaultUser.email, game } });
		expect(response?.newGames.length).toBe(1);
		expect(response?.newGames).toEqual([game]);
	});

	it('get all games', async () => {
		await queriesGames.addGame(url, { addGame: { email: defaultUser.email, game } });
		const { response } = await queriesGames.getGames(url, { email: defaultUser.email });
		expect(response?.games).toEqual([game]);
	});

	it('update a game', async () => {
		const newGame = { ...game, name: 'newName', tags: ['new Tag', 'tag02'] };
		await queriesGames.addGame(url, { addGame: { email: defaultUser.email, game } });

		const { response } = await queriesGames.updateGame(url, {
			updateGame: {
				email: defaultUser.email,
				gameName: game.name,
				update: newGame,
			},
		});

		expect(response?.newGames).toEqual([newGame]);
	});

	it('Remove a game', async () => {
		await queriesGames.addGame(url, { addGame: { email: defaultUser.email, game } });

		const { response } = await queriesGames.removeGame(url, {
			removeGame: {
				email: defaultUser.email,
				gameName: game.name,
			},
		});

		expect(response?.newGames).toEqual([]);
	});
});
