import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Field } from '../field';
import { render, screen } from '@testing-library/react';

describe('Field component', () => {
	const user = userEvent.setup();

	it('Show and hide password', async () => {
		render(<Field props={{ changeValue: vi.fn(), error: '', name: 'password', placeholder: 'Senha', type: 'password', value: '123123' }} />);

		let buttonChangeInputType = screen.getByRole('field').querySelector('.icon');
		const input = screen.getByRole('input');

		await user.click(buttonChangeInputType!);
		expect(input.getAttribute('type')).toBe('text');

		buttonChangeInputType = screen.getByRole('field').querySelector('.icon');
		await user.click(buttonChangeInputType!);
		expect(input.getAttribute('type')).toBe('password');
	});
});
