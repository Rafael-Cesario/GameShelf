import produce from 'immer';
import { IMarker } from '@/interfaces/IMarkers';
import { Dispatch, SetStateAction } from 'react';
import { StyledFilter } from '../../styles/styledFilter';

type FilterName = 'tags' | 'genre' | 'rate';

interface FilterProps {
	props: {
		title: 'Tags' | 'Gêneros' | 'Nota';
		filterName: FilterName;
		filters: string[];
		values: IMarker;
		setValues: Dispatch<SetStateAction<IMarker>>;
	};
}

export const Filter = ({ props: { title, filters, filterName, values, setValues } }: FilterProps) => {
	const changeFilters = (filterName: 'tags' | 'genre', value: string) => {
		const newValues = produce(values, (draft) => {
			const filters = draft.filters[filterName];
			const hasValue = filters.indexOf(value);

			if (hasValue < 0) filters.push(value);
			else filters.splice(hasValue, 1);

			draft.filters[filterName] = filters;
		});

		setValues(newValues);
	};

	const changeRate = (newValue: string) => {
		const newValues = produce(values, (draft) => {
			draft.filters.rate = draft.filters.rate === newValue ? '' : newValue;
		});

		setValues(newValues);
	};

	return (
		<StyledFilter>
			<h2>{title}</h2>

			<div className="filter">
				{!filters.length && <p className="faded">Tags e gêneros adicionados aos seus jogos apareceram aqui.</p>}

				{filters.map((filter) => (
					<button
						role="filter"
						className={values.filters[filterName].includes(filter) ? 'active' : ''}
						onClick={() => (filterName === 'rate' ? changeRate(filter) : changeFilters(filterName, filter))}
						key={filter}>
						{filter}
					</button>
				))}
			</div>
		</StyledFilter>
	);
};
