import produce from 'immer';
import { IGame } from '@/interfaces/IGames';
import { Filter } from './filter';
import { StyledFilterContainer } from './styles/styledFilterContainer';
import { Dispatch, SetStateAction, useState } from 'react';
import { indexOfFilter } from '@/features/index/utils/indexOfFilter';

interface FilterContainerProps {
	props: {
		title: string;
		filterName: 'tags' | 'genre';
		gameValues: IGame;
		setGameValues: Dispatch<SetStateAction<IGame>>;
	};
}

export const FilterContainer = ({ props: { title, filterName, gameValues, setGameValues } }: FilterContainerProps) => {
	const [value, setValue] = useState('');

	const addNewFilter = () => {
		const newValues = produce(gameValues, (draft) => {
			const hasFilter = indexOfFilter(gameValues[filterName], value);
			if (hasFilter >= 0) return;

			draft[filterName].push(value);
		});

		setGameValues(newValues);
		setValue('');
	};

	return (
		<StyledFilterContainer>
			<div className="top">
				<h1 className="title">{title}</h1>
				<input
					type="text"
					role="add-filter"
					placeholder="Adicionar novo"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					onKeyUp={(e) => e.key === 'Enter' && addNewFilter()}
				/>
				<button role="button-add-filter" onClick={() => addNewFilter()}>
					+
				</button>
			</div>

			<Filter props={{ filterName, gameValues, setGameValues }} />
		</StyledFilterContainer>
	);
};
