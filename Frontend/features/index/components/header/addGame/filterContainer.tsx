import { IGame } from '@/interfaces/IGames';
import { Filter } from './filter';
import { StyledFilterContainer } from './styles/styledFilterContainer';
import { Dispatch, SetStateAction } from 'react';

interface FilterContainerProps {
	props: {
		title: string;
		filterName: string;
		gameValues: IGame;
		setGameValues: Dispatch<SetStateAction<IGame>>;
	};
}

export const FilterContainer = ({ props: { title, filterName } }: FilterContainerProps) => {
	return (
		<StyledFilterContainer>
			<div className="top">
				<h1 className="title">{title}</h1>
				<input type="text" placeholder="Adicionar novo" />
				<button>+</button>
			</div>

			<Filter props={{ filterName }} />
		</StyledFilterContainer>
	);
};
