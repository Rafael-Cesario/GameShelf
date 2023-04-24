import { StorageUser, storageKeys } from '@/interfaces/interfaceStorageKeys';
import { useGames } from './hooks/useGames';
import { StyledGamesContainer } from './styles/styledGamesContainer';
import { useState, useEffect } from 'react';
import { useNotification } from '@/utils/useNotification';
import { Loading } from './components/sidebar/loading';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '@/context/store';
import { sliceGames } from './slices/games';
import Image from 'next/image';
import { GameDetails } from './components/gamesContainer/gameDetails';

export const GamesContainer = () => {
	const { games } = useSelector((state: Store) => state.games);
	const [loadingGames, setLoadingGames] = useState(true);
	const [showDetails, setShowDetails] = useState({ isOpen: false, gameIndex: 0 });

	const { queryGetGames } = useGames();
	const { sendNotification } = useNotification();
	const dispatch = useDispatch();

	const getGames = async () => {
		const storage = localStorage.getItem(storageKeys.user);
		const { email } = JSON.parse(storage || '') as StorageUser;
		const { data, error } = await queryGetGames({ email });

		if (error) return sendNotification('Erro', 'Não foi possível buscar seus jogos');

		setLoadingGames(false);
		dispatch(sliceGames.actions.setGames({ games: data }));
	};

	useEffect(() => {
		getGames();
	}, []);

	if (loadingGames) return <Loading />;

	return (
		<StyledGamesContainer>
			{games.map((game, index) => (
				<div role="game" className="game" key={game.name} data-name={game.name} onClick={() => setShowDetails({ isOpen: true, gameIndex: index })}>
					{!game.cover && <h1 className="game-name">{game.name}</h1>}
					{game.cover && <Image className="img" fill={true} src={game.cover} alt="game-cover" />}
				</div>
			))}

			{showDetails.isOpen && <GameDetails props={{ showDetails, setShowDetails }} />}
		</StyledGamesContainer>
	);
};
