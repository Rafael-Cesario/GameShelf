import '@testing-library/jest-dom';
import Index from '@/pages/index';
import userEvent from '@testing-library/user-event';
import { store } from '@/context/store';
import { client } from '@/services/client';
import { ApolloProvider } from '@apollo/client';
import { cleanup, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeAll, beforeEach, describe, vi } from 'vitest';
import { storageKeys } from '@/interfaces/interfaceStorageKeys';

vi.mock('next/router', () => ({
	useRouter: vi.fn(),
}));

const renderComponent = () => {
	render(
		<ApolloProvider client={client}>
			<Provider store={store}>
				<Index />
			</Provider>
		</ApolloProvider>
	);
};

describe('Index page', () => {
	const user = userEvent.setup();

	beforeAll(() => {
		const storage = { email: 'qwe@qwe', token: 'fakeToken' };
		localStorage.setItem(storageKeys.user, JSON.stringify(storage));
	});

	beforeEach(async () => {
		cleanup();
		renderComponent();
		await waitForElementToBeRemoved(() => screen.getByRole('loading-page'));
	});

	it(`Show a notification if user try to edit "todos" marker`, async () => {
		await user.click(screen.getByRole('open-update-marker'));
		expect((await screen.findByRole('notification')).querySelector('.title')).toHaveTextContent('Erro');
	});
});
