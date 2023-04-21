import { useFilters } from '@/features/index/hooks/useFilters';
import { StyledRateContainer } from './styles/styledRateContainer';
import { IGame } from '@/interfaces/IGames';
import { Dispatch, SetStateAction } from 'react';

interface RateContainerProps {
	props: {
		gameValues: IGame;
		setGameValues: Dispatch<SetStateAction<IGame>>;
	};
}

export const RateContainer = ({ props: { gameValues, setGameValues } }: RateContainerProps) => {
	const { rates } = useFilters();

	return (
		<StyledRateContainer>
			<h1 className="title">Nota</h1>

			<div className="rates">
				{rates.map((rate) => (
					<button className="rate" key={rate}>
						{rate}
					</button>
				))}
			</div>
		</StyledRateContainer>
	);
};
