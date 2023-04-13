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
	useRouter: () => ({
		reload: vi.fn(),
	}),
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

	it('Show a notification if password or email is wrong', async () => {
		const [email, password] = screen.getAllByRole('input');

		await user.type(email, 'wrong');
		await user.type(password, '123');
		await user.click(screen.getByRole('login'));

		const notification = screen.getByRole('notification');
		const notificationType = notification.querySelector('.title');
		const notificationText = notification.querySelector('.txt');

		expect(notificationType).toHaveTextContent('Erro');
		expect(notificationText).toHaveTextContent('Seu email ou sua senha não estão corretos');
	});

	it('Show a notification if login is successful', async () => {
		const [email, password] = screen.getAllByRole('input');

		await user.type(email, 'qwe@qwe.com');
		await user.type(password, '123');
		await user.click(screen.getByRole('login'));

		const notification = screen.getByRole('notification');
		const notificationType = notification.querySelector('.title');
		const notificationText = notification.querySelector('.txt');

		expect(notificationType).toHaveTextContent('Sucesso');
		expect(notificationText).toHaveTextContent('Login efetuado com sucesso, boas vindas');
	});

	it('Show a notification, email is duplicated', async () => {
		await user.click(screen.getByRole('change-form'));

		const [email, name, password, confirmPassword] = screen.getAllByRole('input');
		await user.type(email, 'wrong@hotmail.com');
		await user.type(name, 'qweqwe');
		await user.type(password, 'QWEqwe123123');
		await user.type(confirmPassword, 'QWEqwe123123');

		const submitButton = screen.getByRole('submit');
		await user.click(submitButton);

		const notification = screen.getByRole('notification');
		const notificationType = notification.querySelector('.title');
		const notificationText = notification.querySelector('.txt');

		expect(notificationType).toHaveTextContent('Erro');
		expect(notificationText).toHaveTextContent('Este email já esta sendo usado');
	});

	it('Show a notification, new user created', async () => {
		await user.click(screen.getByRole('change-form'));

		const [email, name, password, confirmPassword] = screen.getAllByRole('input');
		await user.type(email, 'qwe@hotmail.com');
		await user.type(name, 'qweqwe');
		await user.type(password, 'QWEqwe123123');
		await user.type(confirmPassword, 'QWEqwe123123');

		const submitButton = screen.getByRole('submit');
		await user.click(submitButton);

		const notification = screen.getByRole('notification');
		const notificationType = notification.querySelector('.title');
		const notificationText = notification.querySelector('.txt');

		expect(notificationType).toHaveTextContent('Sucesso');
		expect(notificationText).toHaveTextContent('Novo usuário criado com sucesso, você já pode fazer login');

		const title = screen.getByRole('title');
		expect(title).toHaveTextContent('Login');
	});
});
