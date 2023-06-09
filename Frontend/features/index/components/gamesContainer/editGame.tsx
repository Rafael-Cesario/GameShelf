import { useCallback, useMemo, useState } from 'react';
import { Container } from '../container';
import { useGame } from './hooks/useGame';
import { useShortcuts } from '../../hooks/useShortcuts';
import { StyledEditGame } from './styles/styledEditGame';
import { IGame } from '@/interfaces/IGames';
import { RateContainer } from '../header/addGame/rateContainer';
import { ImageContainer } from '../imageContainer';
import { FilterContainer } from '../header/addGame/filterContainer';
import { useGames } from '../../hooks/useGames';
import { useDispatch, useSelector } from 'react-redux';
import { StorageUser, storageKeys } from '@/interfaces/interfaceStorageKeys';
import { useNotification } from '@/utils/useNotification';
import { sliceGames } from '../../slices/games';
import { Store } from '@/context/store';

export const EditGame = () => {
	const { games, gameDetails } = useSelector((state: Store) => state.games);
	const game = useGame(gameDetails.gameName);
	const [gameValues, setGameValues] = useState<IGame>(game);
	const { name, release, cover } = gameValues;
	const oldName = useMemo(() => name, []);

	const { requestUpdateGame } = useGames();
	const { sendNotification } = useNotification();
	const dispatch = useDispatch();

	const closeEdit = () => dispatch(sliceGames.actions.setGameDetails({ gameDetails: { gameName: game.name, isOpen: 'details' } }));

	useShortcuts(
		useCallback((e: KeyboardEvent) => {
			e.key === 'Escape' && closeEdit();
		}, [])
	);

	const saveGame = async () => {
		if (!name) return sendNotification('Erro', 'Seu jogo precisa de um nome.');

		const alreadyHasGame = games.find((game) => game.name.toLowerCase() === gameValues.name.toLowerCase());
		if (alreadyHasGame && game.name !== gameValues.name) return sendNotification('Erro', 'Um jogo com o mesmo nome já existe.');

		const storage = localStorage.getItem(storageKeys.user);
		const { email } = JSON.parse(storage || '') as StorageUser;

		const { data, error } = await requestUpdateGame({
			updateGame: {
				email,
				gameName: oldName,
				update: gameValues,
			},
		});

		if (error || !data) return sendNotification('Erro', 'Um erro ocorreu, recarregue a página e tente novamente');

		dispatch(sliceGames.actions.setGames({ games: data }));
		dispatch(sliceGames.actions.setGameDetails({ gameDetails: { isOpen: 'details', gameName: gameValues.name } }));
		sendNotification('Sucesso', 'Seu jogo foi atualizado');
	};

	return (
		<Container>
			<StyledEditGame>
				<button onClick={() => closeEdit()} className="close">
					x
				</button>

				<div className="data">
					<input
						role="game-name"
						className="title"
						type="text"
						value={name}
						onChange={(e) => setGameValues({ ...gameValues, name: e.target.value })}
					/>
					<input
						type="text"
						className="info"
						value={release}
						placeholder="Data de lançamento"
						onChange={(e) => setGameValues({ ...gameValues, release: e.target.value })}
					/>

					<RateContainer props={{ gameValues, setGameValues }} />
					<FilterContainer props={{ title: 'Tags', filterName: 'tags', gameValues, setGameValues }} />
					<FilterContainer props={{ title: 'Gêneros', filterName: 'genre', gameValues, setGameValues }} />

					<button onClick={() => saveGame()} className="save-button" role="save-button">
						Salvar
					</button>
				</div>

				<div className="image">
					<ImageContainer props={{ gameName: name, imageLink: cover }} />
					<input
						placeholder="Link para uma imagem"
						type="text"
						className="info"
						value={cover}
						onChange={(e) => setGameValues({ ...gameValues, cover: e.target.value })}
					/>
				</div>
			</StyledEditGame>
		</Container>
	);
};
