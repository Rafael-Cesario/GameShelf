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

	it('Add a game', async () => {
		await user.click(screen.getByRole('open-add-game'));
		await user.type(screen.getByRole('input-name'), 'DummyName');
		await user.click(screen.getByRole('add-game-button'));

		const games = screen.getAllByRole('game');
		expect(games.length).toBe(1);
		expect(games[0].getAttribute('data-name')).toBe('DummyName');
	});

	it(`Can't add a game without a name`, async () => {
		await user.click(screen.getByRole('open-add-game'));
		await user.click(screen.getByRole('add-game-button'));
		expect(screen.getByRole('error-message')).toHaveTextContent('Seu jogo precisa de um nome.');
	});

	it(`Can't add a game that already exist`, async () => {
		await user.click(screen.getByRole('open-add-game'));
		await user.type(screen.getByRole('input-name'), 'DuplicatedGame');
		await user.click(screen.getByRole('add-game-button'));

		await user.type(screen.getByRole('input-name'), 'duplicatedGame');
		await user.click(screen.getByRole('add-game-button'));
		expect(screen.getByRole('error-message')).toHaveTextContent('Um jogo com o mesmo nome já foi adicionado.');
	});
});
