import { useFilters } from '@/features/index/hooks/useFilters';
import { StyledFilter } from './styles/styledFilter';
import produce from 'immer';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '@/context/store';
import { IFilters } from '@/features/index/interfaces/iFilters';
import { sliceGames } from '@/features/index/slices/games';

interface FilterProps {
	props: {
		title: 'Tags' | 'Gênero';
		key: 'tags' | 'genre';
	};
}

export const Filter = ({ props: { title, key } }: FilterProps) => {
	const gameFilters = useFilters();
	const [searchFilterValue, setSearchFilterValue] = useState('');
	const searchFilterValueRegExp = new RegExp(searchFilterValue, 'i');

	const { filters } = useSelector((state: Store) => state.games);
	const dispatch = useDispatch();
	const dispatchFilters = (newFilters: IFilters) => dispatch(sliceGames.actions.setFilters({ newFilters }));

	const findFilterIndex = (filter: string) => filters[key].findIndex((gameFilter) => gameFilter.match(new RegExp(filter, 'i')));

	const addFilter = (filter: string) => {
		const filterIndex = findFilterIndex(filter);
		const hasFilter = filterIndex >= 0;

		const newFilters = produce(filters, (draft) => {
			if (hasFilter) draft[key].splice(filterIndex, 1);
			else draft[key].push(filter);
		});

		dispatchFilters(newFilters);
	};

	const generateClass = (filter: string) => {
		let className = 'filter';
		const hasFilter = findFilterIndex(filter) >= 0;
		if (hasFilter) className += ' active';
		return className;
	};

	return (
		<StyledFilter>
			<h2 className="title">{title}</h2>

			<input
				value={searchFilterValue}
				onChange={(e) => setSearchFilterValue(e.target.value)}
				className="search-filter"
				type="text"
				placeholder={`Busque por ${title}`}
			/>

			<div className="filter-container">
				{gameFilters[key].map((filter) => {
					if (filter.match(searchFilterValueRegExp))
						return (
							<button role="activate-filter" onClick={() => addFilter(filter)} className={generateClass(filter)} key={filter}>
								{filter}
							</button>
						);
				})}
			</div>
		</StyledFilter>
	);
};
