import '@testing-library/jest-dom';
import Authentication from '@/pages/authentication';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '@/context/store';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/services/client';

vi.mock('next/router', () => ({
	useRouter: vi.fn(),
}));

const renderComponent = () => {
	render(
		<ApolloProvider client={client}>
			<Provider store={store}>
				<Authentication />
			</Provider>
		</ApolloProvider>
	);
};

describe('Authentication page', () => {
	beforeAll(() => renderComponent());

	it('Switch between forms', async () => {
		const user = userEvent.setup();
		await user.click(screen.getByRole('change-form'));

		let title = screen.getByRole('title');
		expect(title).toHaveTextContent('Criar conta');

		await user.click(screen.getByRole('change-form'));

		title = screen.getByRole('title');
		expect(title).toHaveTextContent('Login');
	});
});
