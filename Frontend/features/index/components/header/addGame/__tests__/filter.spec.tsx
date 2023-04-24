import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/__tests__/utils/renderWithProviders';
import { beforeEach, describe, it } from 'vitest';
import { FilterContainer } from '../filterContainer';
import { IGame } from '@/interfaces/IGames';
import { cleanup, screen } from '@testing-library/react';
import { useState } from 'react';

const Component = () => {
	const [gameValues, setGameValues] = useState<IGame>({ name: '', release: '', rate: '', cover: '', tags: ['filter01'], genre: [] });

	return <FilterContainer props={{ title: 'Filter', filterName: 'tags', gameValues, setGameValues }} />;
};

describe('Add new game filters', () => {
	const user = userEvent.setup();

	beforeEach(() => {
		cleanup();
		renderWithProviders(<Component />);
	});

	const getAllFilters = () => screen.queryAllByRole('filter');

	const addFilter = async (filterName: string) => {
		await user.type(screen.getByRole('add-filter'), filterName);
		await user.click(screen.getByRole('button-add-filter'));
		return getAllFilters();
	};

	it('add new filters', async () => {
		const filterName = 'New filter';
		const filters = await addFilter(filterName);

		expect(filters.length).toBe(2);
		expect(filters[1].className).toBe('filter active');
		expect(filters[1]).toHaveTextContent(filterName);
	});

	it('Remove filter', async () => {
		let filters = getAllFilters();
		await user.click(filters[0]);
		filters = getAllFilters();
		expect(filters.length).toBe(0);
	});

	it(`Can't add repeated filter`, async () => {
		const filterName = 'repeatedFilter';
		await addFilter(filterName);
		const filters = await addFilter(filterName);
		expect(filters.length).toBe(2);
	});

	it.todo('Search for a filter');
});
