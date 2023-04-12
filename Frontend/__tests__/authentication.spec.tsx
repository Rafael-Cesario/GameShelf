import '@testing-library/jest-dom';
import Authentication from '@/pages/authentication';
import userEvent from '@testing-library/user-event';
import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '@/context/store';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/services/client';
import { server } from '@/services/mocks/server';

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
	const user = userEvent.setup();

	beforeEach(() => {
		cleanup();
		renderComponent();
	});

	it('Switch between forms', async () => {
		await user.click(screen.getByRole('change-form'));

		let title = screen.getByRole('title');
		expect(title).toHaveTextContent('Criar conta');

		await user.click(screen.getByRole('change-form'));

		title = screen.getByRole('title');
		expect(title).toHaveTextContent('Login');
	});

	// todo > unit test
	it('Show errors if user click on the submit button without filling the inptus', async () => {
		await user.click(screen.getByRole('login'));

		const label = screen.getAllByRole('label')[0];
		expect(label).toHaveTextContent('Este campo não pode ficar vazio');
	});

	it('Show a notification if password or email is wrong', async () => {
		const [email, password] = screen.getAllByRole('input');

		await user.type(email, 'qwe');
		await user.type(password, '123');
		await user.click(screen.getByRole('login'));

		const notification = screen.getByRole('notification');
		const notificationType = notification.querySelector('.title');
		const notificationText = notification.querySelector('.txt');

		expect(notificationType).toHaveTextContent('Erro');
		expect(notificationText).toHaveTextContent('Seu email ou sua senha não estão corretos');
	});
});
