import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { describe, vi } from 'vitest';
import { Login } from '../login';
import { cleanup, render, screen } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/services/client';
import { Provider } from 'react-redux';
import { store } from '@/context/store';
import { storageKeys } from '@/interfaces/interfaceStorageKeys';

vi.mock('next/router', () => ({
	useRouter: () => ({
		reload: vi.fn(),
	}),
}));

const renderLogin = () => {
	render(
		<ApolloProvider client={client}>
			<Provider store={store}>
				<Login props={{ setFormName: vi.fn() }} />
			</Provider>
		</ApolloProvider>
	);
};

describe('Login', () => {
	const user = userEvent.setup();

	beforeEach(() => {
		cleanup();
		renderLogin();
	});

	it('Change input value', async () => {
		const [email] = screen.getAllByRole('input');
		await user.type(email, 'qwe@qwe.com');
		expect(email).toHaveValue('qwe@qwe.com');
	});

	it('Show errors if user click on the submit button without filling the inptus', async () => {
		await user.click(screen.getByRole('login'));

		const label = screen.getAllByRole('label')[0];
		expect(label).toHaveTextContent('Este campo não pode ficar vazio');
	});

	it('Saves email and token on localStorage if login is successful', async () => {
		const defaultUser = { email: 'qwe@qwe.com', password: '123123' };
		const [email, password] = screen.getAllByRole('input');

		await user.type(email, defaultUser.email);
		await user.type(password, defaultUser.password);
		await user.click(screen.getByRole('login'));

		const storage = JSON.parse(localStorage.getItem(storageKeys.user) || '');
		expect(storage).toHaveProperty('email', defaultUser.email);
		expect(storage).toHaveProperty('token', 'dummyToken!');
	});
});
