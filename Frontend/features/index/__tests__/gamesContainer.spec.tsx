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
		let currentGameDetails = await waitFor(() => screen.findByRole('game-name'));
		expect(currentGameDetails).toHaveTextContent('Game01');

		await user.click(screen.getByRole('close-details'));

		await user.click(games[1]);
		currentGameDetails = await waitFor(() => screen.findByRole('game-name'));
		expect(currentGameDetails).toHaveTextContent('Game02');
	});
});
