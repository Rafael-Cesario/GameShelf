import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import { cleanup, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Sidebar } from '../sidebar';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/services/client';
import { storageKeys } from '@/interfaces/interfaceStorageKeys';
import { Provider } from 'react-redux';
import { store } from '@/context/store';

const renderComponent = () => {
	render(
		<ApolloProvider client={client}>
			<Provider store={store}>
				<Sidebar />
			</Provider>
		</ApolloProvider>
	);
};

describe('Sidebar', () => {
	const user = userEvent.setup();

	beforeAll(() => {
		const storage = { email: 'qwe@qwe' };
		localStorage.setItem(storageKeys.user, JSON.stringify(storage));
	});

	beforeEach(async () => {
		cleanup();
		renderComponent();
		await waitForElementToBeRemoved(() => screen.getByRole('loading'));
	});

	it('get markers', async () => {
		const markers = screen.getAllByRole('marker');
		expect(markers.length).toBe(4);
	});

	it('Set current marker', async () => {
		const markers = screen.getAllByRole('marker');
		expect(markers[0].className).toMatch('active');

		await user.click(markers[2]);
		expect(markers[0].className).not.toMatch('active');
		expect(markers[2].className).toMatch('active');
	});

	it.todo('Create a new marker', async () => {});
});
