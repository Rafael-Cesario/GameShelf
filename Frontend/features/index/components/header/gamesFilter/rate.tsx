import { IFilters } from '@/features/index/interfaces/iFilters';
import { StyledFilter } from './styles/styledFilter';
import { useFilters } from '@/features/index/hooks/useFilters';
import produce from 'immer';

interface FilterProps {
	props: {
		filters: IFilters;
		setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
	};
}

export const Rate = ({ props: { filters, setFilters } }: FilterProps) => {
	const { rates } = useFilters();

	const generateClass = (rate: string) => {
		let className = 'filter';
		const hasFilter = filters.rate === rate;
		if (hasFilter) className += ' active';
		return className;
	};

	const addRate = (rate: string) => {
		const hasFilter = filters.rate === rate;

		const newFilters = produce(filters, (draft) => {
			if (hasFilter) draft.rate = '';
			else draft.rate = rate;
		});

		setFilters(newFilters);
	};

	return (
		<StyledFilter>
			<h2 className="title">Nota</h2>

			<div className="filter-container">
				{rates.map((rate) => (
					<button key={rate} className={generateClass(rate)} onClick={() => addRate(rate)}>
						{rate}
					</button>
				))}
			</div>
		</StyledFilter>
	);
};
