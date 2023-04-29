import { Store } from '@/context/store';
import { useDispatch, useSelector } from 'react-redux';
import { sliceGames } from '../../slices/games';

export const SearchGame = () => {
	const { searchGame } = useSelector((state: Store) => state.games);
	const dispatch = useDispatch();

	return (
		<input
			role="search-game"
			className="search"
			type="text"
			placeholder="Busque por um jogo, tag, gênero ou nota"
			value={searchGame}
			onChange={(e) => dispatch(sliceGames.actions.setSearchGame({ searchGameValue: e.target.value }))}
		/>
	);
};
