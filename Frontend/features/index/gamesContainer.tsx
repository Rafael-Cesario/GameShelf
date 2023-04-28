import Image from 'next/image';
import { StorageUser, storageKeys } from '@/interfaces/interfaceStorageKeys';
import { useGames } from './hooks/useGames';
import { StyledGamesContainer } from './styles/styledGamesContainer';
import { useState, useEffect } from 'react';
import { useNotification } from '@/utils/useNotification';
import { Loading } from './components/sidebar/loading';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '@/context/store';
import { sliceGames } from './slices/games';
import { GameDetails } from './components/gamesContainer/gameDetails';
import { EditGame } from './components/gamesContainer/editGame';

export interface IGameDetails {
	isOpen: '' | 'details' | 'edit';
	gameIndex: number;
}

export const GamesContainer = () => {
	const { games, filter } = useSelector((state: Store) => state.games);
	const [loadingGames, setLoadingGames] = useState(true);
	const [gameDetails, setGameDetails] = useState<IGameDetails>({ isOpen: '', gameIndex: 0 });

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

	const filterGames = () => {
		const filterRegExp = new RegExp(filter, 'i');

		const filteredGames = games.filter((game) => {
			const matchName = game.name.match(filterRegExp);
			if (matchName) return game;

			const matchTag = game.tags.find((tag) => tag.match(filterRegExp));
			if (matchTag) return game;

			const matchGenre = game.genre.find((genre) => genre.match(filterRegExp));
			if (matchGenre) return game;
		});

		return filteredGames;
	};

	useEffect(() => {
		getGames();
	}, []);

	if (loadingGames) return <Loading />;

	return (
		<StyledGamesContainer>
			{filterGames().map((game, index) => (
				<div
					role="game"
					className="game"
					key={game.name}
					data-name={game.name}
					onClick={() => setGameDetails({ isOpen: 'details', gameIndex: index })}>
					{!game.cover && <h1 className="game-name">{game.name}</h1>}
					{game.cover && <Image className="img" fill={true} src={game.cover} alt="game-cover" />}
				</div>
			))}

			{gameDetails.isOpen === 'details' && <GameDetails props={{ gameDetails, setGameDetails }} />}
			{gameDetails.isOpen === 'edit' && <EditGame props={{ gameDetails, setGameDetails }} />}
		</StyledGamesContainer>
	);
};
