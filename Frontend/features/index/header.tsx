import { useSelector } from 'react-redux';
import { AddGame } from './components/header/addGame';
import { GamesFilter } from './components/header/gamesFilter';
import { SearchGame } from './components/header/searchGame';
import { StyledHeader } from './styles/styledHeader';
import { Store } from '@/context/store';
import { useFilteredGames } from './hooks/useFilteredGames';
import { RandomGame } from './components/header/randomGame';

export const Header = () => {
	const { active } = useSelector((state: Store) => state.marker);
	const { games } = useFilteredGames();

	return (
		<StyledHeader>
			<div>
				<span role="current-marker" className="games-on-marker">
					{active}: {games.length} {games.length === 1 ? 'Jogo' : 'Jogos'}
				</span>

				<RandomGame />
				<GamesFilter />
				<AddGame />
			</div>

			<SearchGame />
		</StyledHeader>
	);
};
