import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { cleanup, render, screen } from '@testing-library/react';
import { beforeAll, beforeEach, describe } from 'vitest';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { store } from '@/context/store';
import { client } from '@/services/client';
import { Header } from '../header';
import { storageKeys } from '@/interfaces/interfaceStorageKeys';
import { GamesContainer } from '../gamesContainer';

const renderComponent = () => {
	render(
		<ApolloProvider client={client}>
			<Provider store={store}>
				<Header />
				<GamesContainer />
			</Provider>
		</ApolloProvider>
	);
};

describe('Header', () => {
	beforeAll(() => {
		const storage = { email: 'qwe@qwe', token: 'fakeToken' };
		localStorage.setItem(storageKeys.user, JSON.stringify(storage));
	});

	beforeEach(() => {
		cleanup();
		renderComponent();
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

	it.todo(`Can't add a game that already exist`);
});
