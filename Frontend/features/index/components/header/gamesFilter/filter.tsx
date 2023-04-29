import { useFilters } from '@/features/index/hooks/useFilters';
import { StyledFilter } from './styles/styledFilter';
import { IFilters } from '@/features/index/interfaces/iFilters';
import produce from 'immer';
import { useState } from 'react';

interface FilterProps {
	props: {
		title: 'Tags' | 'Gênero';
		key: 'tags' | 'genre';
		filters: IFilters;
		setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
	};
}

export const Filter = ({ props: { title, key, filters, setFilters } }: FilterProps) => {
	const gameFilters = useFilters();
	const [searchFilterValue, setSearchFilterValue] = useState('');
	const searchFilterValueRegExp = new RegExp(searchFilterValue, 'i');

	const findFilterIndex = (filter: string) => filters[key].findIndex((gameFilter) => gameFilter.match(new RegExp(filter, 'i')));

	const addFilter = (filter: string) => {
		const filterIndex = findFilterIndex(filter);
		const hasFilter = filterIndex >= 0;

		const newFilters = produce(filters, (draft) => {
			if (hasFilter) draft[key].splice(filterIndex, 1);
			else draft[key].push(filter);
		});

		setFilters(newFilters);
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
							<button onClick={() => addFilter(filter)} className={generateClass(filter)} key={filter}>
								{filter}
							</button>
						);
				})}
			</div>
		</StyledFilter>
	);
};
