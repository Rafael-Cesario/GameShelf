import { Store } from '@/context/store';
import { useDispatch, useSelector } from 'react-redux';
import { sliceGames } from '../../slices/games';

export const SearchGame = () => {
	const { filter } = useSelector((state: Store) => state.games);
	const dispatch = useDispatch();

	return (
		<input
			className="search"
			type="text"
			placeholder="Busque por um jogo, tag, gênero ou nota"
			value={filter}
			onChange={(e) => dispatch(sliceGames.actions.setFilter({ filter: e.target.value }))}
		/>
	);
};
