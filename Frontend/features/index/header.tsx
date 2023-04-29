import { AddGame } from './components/header/addGame';
import { GamesFilter } from './components/header/gamesFilter';
import { SearchGame } from './components/header/searchGame';
import { StyledHeader } from './styles/styledHeader';

export const Header = () => {
	return (
		<StyledHeader>
			<div>
				<span className="games-on-marker">Zerados: 20 Jogos</span>
				<button>Aleatório</button>
				<GamesFilter />
				<AddGame />
			</div>

			<SearchGame />
		</StyledHeader>
	);
};
