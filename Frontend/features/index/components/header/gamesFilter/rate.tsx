import produce from 'immer';
import { IFilters } from '@/features/index/interfaces/iFilters';
import { StyledFilter } from './styles/styledFilter';
import { useFilters } from '@/features/index/hooks/useFilters';
import { useDispatch, useSelector } from 'react-redux';
import { sliceGames } from '@/features/index/slices/games';
import { Store } from '@/context/store';

export const Rate = () => {
	const { rates } = useFilters();

	const { filters } = useSelector((state: Store) => state.games);
	const dispatch = useDispatch();
	const dispatchFilters = (newFilters: IFilters) => dispatch(sliceGames.actions.setFilters({ newFilters }));

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

		dispatchFilters(newFilters);
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
