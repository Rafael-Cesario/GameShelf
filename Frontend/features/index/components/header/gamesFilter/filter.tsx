import { useFilters } from '@/features/index/hooks/useFilters';
import { StyledFilter } from './styles/styledFilter';

interface FilterProps {
	props: {
		title: 'Tags' | 'Gênero' | 'Nota';
		key: 'tags' | 'genre' | 'rates';
	};
}

export const Filter = ({ props: { title, key } }: FilterProps) => {
	const filters = useFilters();

	return (
		<StyledFilter>
			<h2 className="title">{title}</h2>
			<input className="search-filter" type="text" placeholder={`Busque por ${title}`} />

			<div className="filter-container">
				{filters[key].map((filter) => (
					<button className="filter" key={filter}>
						{filter}
					</button>
				))}
			</div>
		</StyledFilter>
	);
};
