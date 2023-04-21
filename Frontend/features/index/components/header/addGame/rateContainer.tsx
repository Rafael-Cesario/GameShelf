import { useFilters } from '@/features/index/hooks/useFilters';
import { StyledRateContainer } from './styles/styledRateContainer';

export const RateContainer = () => {
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
