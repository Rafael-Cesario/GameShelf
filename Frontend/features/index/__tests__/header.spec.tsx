import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { cleanup, screen } from '@testing-library/react';
import { beforeAll, beforeEach, describe } from 'vitest';
import { Header } from '../header';
import { storageKeys } from '@/interfaces/interfaceStorageKeys';
import { GamesContainer } from '../gamesContainer';
import { renderWithProviders } from '@/features/__tests__/utils/renderWithProviders';

const Component = (
	<>
		<Header />
		<GamesContainer />
	</>
);

describe('Header', () => {
	beforeAll(() => {
		const storage = { email: 'qwe@qwe', token: 'fakeToken' };
		localStorage.setItem(storageKeys.user, JSON.stringify(storage));
	});

	beforeEach(() => {
		cleanup();
		renderWithProviders(Component);
	});

	const user = userEvent.setup();
	const { getAllByRole, getByRole } = screen;

	const addGame = async (gameName?: string) => {
		await user.click(getByRole('open-add-game'));
		gameName && (await user.type(getByRole('input-name'), gameName));
		await user.click(getByRole('add-game-button'));
	};

	it('Add a game', async () => {
		await addGame('DummyName');

		const games = getAllByRole('game');
		expect(games.length).toBe(1);
		expect(games[0].getAttribute('data-name')).toBe('DummyName');
	});

	it(`Can't add a game without a name`, async () => {
		await addGame();
		expect(getByRole('error-message')).toHaveTextContent('Seu jogo precisa de um nome.');
	});

	it(`Can't add a game that already exist`, async () => {
		await addGame('DuplicatedGame');
		await addGame('DuplicatedGame');
		expect(getByRole('error-message')).toHaveTextContent('Um jogo com o mesmo nome já foi adicionado.');
	});

	it(`Search for a game`, async () => {
		await addGame('Game01');
		await addGame('Game02');
		await addGame('Game03');

		await user.type(getByRole('search-game'), '01');

		let games = getAllByRole('game');
		expect(games.length).toBe(1);

		await user.clear(getByRole('search-game'));
		await user.type(getByRole('search-game'), '0');

		games = getAllByRole('game');
		expect(games.length).toBe(3);
	});
});
