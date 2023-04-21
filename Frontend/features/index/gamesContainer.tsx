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

export const GamesContainer = () => {
	const [loadingGames, setLoadingGames] = useState(true);
	const { games } = useSelector((state: Store) => state.games);
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

	return (
		<StyledGamesContainer>
			{loadingGames && <Loading />}

			{games.map((game) => (
				<div className="game" key={game.name}>
					{!game.cover && <h1 className="game-name">{game.name}</h1>}
					{game.cover && <Image className="img" fill={true} src={game.cover} alt="game-cover" />}
				</div>
			))}
		</StyledGamesContainer>
	);
};
