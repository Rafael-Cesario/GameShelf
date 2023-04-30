import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Index from '@/pages/index';
import { describe, it, expect, beforeEach, beforeAll, vi } from 'vitest';
import { cleanup, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { storageKeys } from '@/interfaces/interfaceStorageKeys';
import { renderWithProviders } from '@/features/__tests__/utils/renderWithProviders';

vi.mock('next/router', () => ({
	useRouter: vi.fn(),
}));

describe('Sidebar', () => {
	const user = userEvent.setup();

	beforeAll(() => {
		const storage = { email: 'qwe@qwe', token: 'fakeToken' };
		localStorage.setItem(storageKeys.user, JSON.stringify(storage));
	});

	beforeEach(async () => {
		cleanup();
		renderWithProviders(<Index />);
		await waitForElementToBeRemoved(() => screen.getByRole('loading-page'));
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

	it('Create a new marker', async () => {
		await user.click(screen.getByRole('open-create-marker'));
		await user.type(screen.getByRole('marker-name'), 'new marker');
		await user.click(screen.getByRole('create-marker'));

		const markers = screen.getAllByRole('marker');
		expect(markers[4]).toHaveTextContent('new marker');
		expect(markers[4].className).toMatch('active');
	});

	it(`Can't create a marker without a name`, async () => {
		await user.click(screen.getByRole('open-create-marker'));
		await user.click(screen.getByRole('create-marker'));
		expect(screen.getByRole('error')).toHaveTextContent('Escolha um nome para o seu marcador');
	});

	it('Update marker name', async () => {
		await user.click(screen.getAllByRole('marker')[2]);
		await user.click(screen.getByRole('open-update-marker'));
		expect(screen.getByRole('title')).toHaveTextContent('marker02');

		await user.clear(screen.getByRole('marker-name'));
		await user.type(screen.getByRole('marker-name'), 'new name');
		await user.click(screen.getByRole('save-marker'));

		const markers = screen.getAllByRole('marker');
		expect(markers[2]).toHaveTextContent('new name');
	});

	it(`Can't update marker without a name`, async () => {
		await user.click(screen.getAllByRole('marker')[2]);
		await user.click(screen.getByRole('open-update-marker'));
		await user.clear(screen.getByRole('marker-name'));
		await user.click(screen.getByRole('save-marker'));
		expect(screen.getByRole('error')).toHaveTextContent('Seu marcador precisa de um nome');
	});

	it('Delete a marker', async () => {
		await user.click(screen.getAllByRole('marker')[2]);
		await user.click(screen.getByRole('open-update-marker'));
		await user.click(screen.getByRole('show-delete'));
		await user.click(screen.getByRole('delete'));

		const markers = screen.getAllByRole('marker');
		expect(markers.length).toBe(3);
	});

	it('Filter markers', async () => {
		await user.type(screen.getByRole('marker-search'), '02');
		const markers = screen.getAllByRole('marker');
		expect(markers.length).toBe(2);
	});
});
