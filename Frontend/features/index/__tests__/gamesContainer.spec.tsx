import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/features/__tests__/utils/renderWithProviders';
import { cleanup, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { beforeAll, beforeEach, describe, it } from 'vitest';
import { GamesContainer } from '../gamesContainer';
import { storageKeys } from '@/interfaces/interfaceStorageKeys';
import { Header } from '../header';

const Component = () => {
	return (
		<>
			<Header />
			<GamesContainer />
		</>
	);
};

describe('Games container', () => {
	beforeAll(() => {
		const storage = { email: 'qwe@qwe', token: 'dummyToken' };
		localStorage.setItem(storageKeys.user, JSON.stringify(storage));
	});

	beforeEach(async () => {
		cleanup();
		renderWithProviders(<Component />);
		await waitForElementToBeRemoved(screen.getByRole('loading'));
	});

	const user = userEvent.setup();

	const addGame = async (gameName: string) => {
		await user.click(screen.getByRole('open-add-game'));
		await user.type(screen.getByRole('input-name'), gameName);
		await user.click(screen.getByRole('add-game-button'));
	};

	const getAllGames = () => screen.getAllByRole('game');

	it('show current game details', async () => {
		await addGame('Game01');
		await addGame('Game02');

		const games = getAllGames();

		await user.click(games[0]);
		let currentGameName = await waitFor(() => screen.findByRole('game-name'));
		expect(currentGameName).toHaveTextContent('Game01');

		await user.click(screen.getByRole('close-details'));

		await user.click(games[1]);
		currentGameName = await waitFor(() => screen.findByRole('game-name'));
		expect(currentGameName).toHaveTextContent('Game02');
	});

	it(`Change the game's name`, async () => {
		await addGame('Change my name');

		const games = getAllGames();
		await user.click(games[games.length - 1]);

		await user.click(screen.getByRole('edit-game'));
		await user.clear(screen.getByRole('game-name'));
		await user.type(screen.getByRole('game-name'), 'New name');
		await user.click(screen.getByRole('save-button'));

		const currentGameName = await waitFor(() => screen.findByRole('game-name'));
		expect(currentGameName).toHaveTextContent('New name');
	});

	it('Delete a game', async () => {
		await addGame('Delete me');

		let games = getAllGames();
		const gamesLength = games.length;

		await user.click(games[games.length - 1]);
		await user.click(screen.getByRole('delete-game'));
		await user.click(screen.getByRole('delete-game-confirm'));

		games = getAllGames();
		expect(games.length).toBe(gamesLength - 1);
	});
});
