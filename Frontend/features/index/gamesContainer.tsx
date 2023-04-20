import { StorageUser, storageKeys } from '@/interfaces/interfaceStorageKeys';
import { useGames } from './hooks/useGames';
import { StyledGamesContainer } from './styles/styledGamesContainer';
import { useState } from 'react';
import { useNotification } from '@/utils/useNotification';
import { IGame } from '@/interfaces/IGames';
import { Loading } from './components/sidebar/loading';

export const GamesContainer = () => {
	const [loadingGames, setLoadingGames] = useState(true);
	const [games, setGames] = useState<IGame[]>([]);
	const { queryGetGames } = useGames();
	const { sendNotification } = useNotification();

	const getGames = async () => {
		const storage = localStorage.getItem(storageKeys.user);
		const { email } = JSON.parse(storage || '') as StorageUser;
		const { data, error } = await queryGetGames({ email });

		if (error) return sendNotification('Erro', 'Não foi possível buscar seus jogos');

		setLoadingGames(false);
		setGames(data);
	};

	getGames();

	return (
		<StyledGamesContainer>
			{loadingGames && <Loading />}

			{games.map((game, index) => (
				<div
					className="game"
					key={index}></div>
			))}
		</StyledGamesContainer>
	);
};
