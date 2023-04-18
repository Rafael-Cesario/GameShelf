import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import { cleanup, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Sidebar } from '../sidebar';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/services/client';
import { storageKeys } from '@/interfaces/interfaceStorageKeys';

const renderComponent = () => {
	render(
		<ApolloProvider client={client}>
			<Sidebar />
		</ApolloProvider>
	);
};

describe('Sidebar', () => {
	beforeAll(() => {
		const storage = { email: 'qwe@qwe' };
		localStorage.setItem(storageKeys.user, JSON.stringify(storage));
	});

	beforeEach(() => {
		cleanup();
		renderComponent();
	});

	it('get markers', async () => {
		await waitForElementToBeRemoved(() => screen.getByRole('loading'));
		const markers = screen.getAllByRole('marker');
		expect(markers.length).toBe(3);
	});
});
