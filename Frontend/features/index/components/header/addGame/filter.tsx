import { useFilters } from '../../../hooks/useFilters';
import { StyledFilter } from './styles/styledFilter';

interface FilterProps {
	props: {
		filterName: string;
	};
}

export const Filter = ({ props: { filterName } }: FilterProps) => {
	const filters = useFilters();

	return (
		<StyledFilter>
			<input type="text" className="filter-input" placeholder={'Buscar...'} />

			{filters[filterName as keyof typeof filters].map((filter) => (
				<button className={'filter'} key={filter}>
					{filter}
				</button>
			))}
		</StyledFilter>
	);
};
