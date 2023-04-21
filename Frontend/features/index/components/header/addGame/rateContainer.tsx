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

	const getClass = (rate: string) => {
		const className = gameValues.rate === rate ? 'rate active' : 'rate';
		return className;
	};

	const addRate = (rate: string) => {
		if (gameValues.rate === rate) rate = '';
		setGameValues({ ...gameValues, rate });
	};

	return (
		<StyledRateContainer>
			<h1 className="title">Nota</h1>

			<div className="rates">
				{rates.map((rate) => (
					<button onClick={() => addRate(rate)} className={getClass(rate)} key={rate}>
						{rate}
					</button>
				))}
			</div>
		</StyledRateContainer>
	);
};
