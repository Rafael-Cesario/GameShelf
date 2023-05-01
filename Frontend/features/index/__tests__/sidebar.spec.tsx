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

	const createMarker = async (markerName?: string, tag?: string) => {
		await user.click(getByRole('open-create-marker'));
		markerName && (await user.type(getByRole('marker-name'), markerName));
		tag && (await user.click(screen.getByText(tag)));
		await user.click(getByRole('create-marker'));
	};

	const addGame = async (gameName?: string, tag?: string) => {
		await user.click(getByRole('open-add-game'));
		gameName && (await user.type(getByRole('input-name'), gameName));

		if (tag) {
			const tagsInput = screen.getAllByRole('add-filter')[0];
			await user.type(tagsInput, tag);
			await user.click(screen.getAllByRole('button-add-filter')[0]);
		}

		await user.click(getByRole('add-game-button'));
	};

	const { getAllByRole, getByRole } = screen;

	it('get markers', async () => {
		await waitForElementToBeRemoved(() => screen.getAllByRole('loading'));
		const markers = getAllByRole('marker');
		expect(markers.length).toBe(4);
	});

	it('Set current marker', async () => {
		const markers = getAllByRole('marker');
		expect(markers[0].className).toMatch('active');

		await user.click(markers[2]);
		expect(markers[0].className).not.toMatch('active');
		expect(markers[2].className).toMatch('active');
	});

	it('Create a new marker', async () => {
		const newMarkerName = 'new marker';
		await user.click(getByRole('open-create-marker'));
		await user.type(getByRole('marker-name'), newMarkerName);
		await user.click(getByRole('create-marker'));

		const markers = getAllByRole('marker');
		expect(markers[4]).toHaveTextContent(newMarkerName);
	});

	it(`Can't create a marker without a name`, async () => {
		await user.click(getByRole('open-create-marker'));
		await user.click(getByRole('create-marker'));
		expect(getByRole('error')).toHaveTextContent('Escolha um nome para o seu marcador');
	});

	it('Update marker name', async () => {
		await user.click(getAllByRole('marker')[2]);
		await user.click(getByRole('open-update-marker'));
		expect(getByRole('title')).toHaveTextContent('marker02');

		await user.clear(getByRole('marker-name'));
		await user.type(getByRole('marker-name'), 'new name');
		await user.click(getByRole('save-marker'));

		const markers = getAllByRole('marker');
		expect(markers[2]).toHaveTextContent('new name');
	});

	it(`Can't update marker without a name`, async () => {
		await user.click(getAllByRole('marker')[2]);
		await user.click(getByRole('open-update-marker'));
		await user.clear(getByRole('marker-name'));
		await user.click(getByRole('save-marker'));
		expect(getByRole('error')).toHaveTextContent('Seu marcador precisa de um nome');
	});

	it('Delete a marker', async () => {
		await user.click(getAllByRole('marker')[2]);
		await user.click(getByRole('open-update-marker'));
		await user.click(getByRole('show-delete'));
		await user.click(getByRole('delete'));

		const markers = getAllByRole('marker');
		expect(markers.length).toBe(3);
	});

	it('Filter markers', async () => {
		await user.type(getByRole('marker-search'), '02');
		const markers = getAllByRole('marker');
		expect(markers.length).toBe(2);
	});

	it('activate filters when user change markers', async () => {
		await addGame('New Game', 'Zerados');
		await addGame('another Game', 'another tag');
		await createMarker('New Marker', 'Zerados');

		let games = getAllByRole('game');
		expect(games.length).toBe(2);

		const markers = screen.getAllByRole('marker');
		await user.click(markers[markers.length - 1]);

		games = getAllByRole('game');
		expect(games.length).toBe(1);
		expect(screen.getByRole('current-marker')).toHaveTextContent('New Marker: 1 Jogo');
	});
});
