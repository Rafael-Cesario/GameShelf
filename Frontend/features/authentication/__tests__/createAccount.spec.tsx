import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { cleanup, render, screen } from '@testing-library/react';
import { describe, vi } from 'vitest';
import { CreateAccount } from '../createAccount';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { client } from '@/services/client';
import { store } from '@/context/store';

const renderCreateAccount = () => {
	render(
		<ApolloProvider client={client}>
			<Provider store={store}>
				<CreateAccount props={{ setFormName: vi.fn() }} />
			</Provider>
		</ApolloProvider>
	);
};

describe('Create account', () => {
	const user = userEvent.setup();
	beforeEach(() => {
		cleanup();
		renderCreateAccount();
	});

	it('change input value', async () => {
		const [email] = screen.getAllByRole('input');
		await user.type(email, 'qwe@qwe.com');
		expect(email).toHaveValue('qwe@qwe.com');
	});

	it('Show errors if inputs are not filled and user try to crate account', async () => {
		const submitButton = screen.getByRole('submit');
		const [labelEmail] = screen.getAllByRole('label');
		await user.click(submitButton);
		expect(labelEmail).toHaveTextContent('Este campo não pode ficar vazio');
	});

	it('show erros if email is invalid', async () => {
		const [labelEmail] = screen.getAllByRole('label');
		const [inputEmail] = screen.getAllByRole('input');
		await user.type(inputEmail, 'qwe');
		expect(labelEmail).toHaveTextContent('Seu email não parece valido, o simbolo "@" não foi encontrado');
	});
});
