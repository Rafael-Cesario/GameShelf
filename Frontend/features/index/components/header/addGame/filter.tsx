import { indexOfFilter } from '@/features/index/utils/indexOfFilter';
import { IGame } from '@/interfaces/IGames';
import { useFilters } from '../../../hooks/useFilters';
import { StyledFilter } from './styles/styledFilter';
import { Dispatch, SetStateAction, useState } from 'react';
import produce from 'immer';

interface FilterProps {
	props: {
		filterName: 'tags' | 'genre';
		gameValues: IGame;
		setGameValues: Dispatch<SetStateAction<IGame>>;
	};
}

export const Filter = ({ props: { filterName, gameValues, setGameValues } }: FilterProps) => {
	const filters = useFilters();
	const [searchValue, setSearchValue] = useState('');

	const getAllFilters = () => {
		const mergedFilters = [...filters[filterName], ...gameValues[filterName]];

		const uniqueFilters = mergedFilters.filter((filter, index) => {
			const hasSameIndex = index === indexOfFilter(mergedFilters, filter.toLowerCase());
			const matchSearchValue = filter.match(new RegExp(searchValue, 'i'));

			if (hasSameIndex && matchSearchValue) return filter;
		});

		return uniqueFilters;
	};

	const addFilter = (filter: string) => {
		const newValues = produce(gameValues, (draft) => {
			const filterIndex = indexOfFilter(draft[filterName], filter);
			const hasFilter = filterIndex >= 0;

			if (!hasFilter) draft[filterName].push(filter.toLowerCase());
			else draft[filterName].splice(filterIndex, 1);
		});

		setGameValues(newValues);
	};

	const generateClass = (filter: string) => {
		let className = 'filter';

		const filterIndex = indexOfFilter(gameValues[filterName], filter);
		if (filterIndex >= 0) className += ' active';

		return className;
	};

	return (
		<StyledFilter>
			<input
				role="search-filter"
				type="text"
				className="filter-input"
				placeholder={'Buscar...'}
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>

			{getAllFilters().map((filter) => (
				<button role="filter" className={generateClass(filter)} key={filter} onClick={() => addFilter(filter)}>
					{filter}
				</button>
			))}
		</StyledFilter>
	);
};
