import { StyledGamesContainer } from './styles/styledGamesContainer';

export const GamesContainer = () => {
	const games = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
	return (
		<StyledGamesContainer>
			{games.map((game, index) => (
				<div className="game" key={index}></div>
			))}
		</StyledGamesContainer>
	);
};
