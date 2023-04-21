import { indexOfFilter } from '@/features/index/utils/indexOfFilter';
import { IGame } from '@/interfaces/IGames';
import { useFilters } from '../../../hooks/useFilters';
import { StyledFilter } from './styles/styledFilter';
import { Dispatch, SetStateAction } from 'react';
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

	const getAllFilters = () => {
		const mergedFilters = [...filters[filterName], ...gameValues[filterName]];
		const uniqueFilters = mergedFilters.filter((filter, index) => {
			filter = filter.toLowerCase();
			if (index === indexOfFilter(mergedFilters, filter)) return filter;
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

	const getClass = (filter: string) => {
		let className = 'filter';

		const filterIndex = indexOfFilter(gameValues[filterName], filter);
		if (filterIndex >= 0) className += ' active';

		return className;
	};

	return (
		<StyledFilter>
			<input type="text" className="filter-input" placeholder={'Buscar...'} />

			{getAllFilters().map((filter) => (
				<button className={getClass(filter)} key={filter} onClick={() => addFilter(filter)}>
					{filter}
				</button>
			))}
		</StyledFilter>
	);
};
