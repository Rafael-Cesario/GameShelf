import type { IGameDetails } from '../../gamesContainer';
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { Container } from './container';
import { useGame } from './hooks/useGame';
import { useShortcuts } from '../../hooks/useShortcuts';
import { StyledEditGame } from './styles/styledEditGame';
import { IGame } from '@/interfaces/IGames';
import { RateContainer } from '../header/addGame/rateContainer';
import { ImageContainer } from '../imageContainer';
import { FilterContainer } from '../header/addGame/filterContainer';
import { useGames } from '../../hooks/useGames';
import { useDispatch } from 'react-redux';
import { StorageUser, storageKeys } from '@/interfaces/interfaceStorageKeys';
import { useNotification } from '@/utils/useNotification';
import { sliceGames } from '../../slices/games';

interface Props {
	props: {
		gameDetails: IGameDetails;
		setGameDetails: Dispatch<SetStateAction<IGameDetails>>;
	};
}

export const EditGame = ({ props: { gameDetails, setGameDetails } }: Props) => {
	const game = useGame(gameDetails.gameIndex);
	const [gameValues, setGameValues] = useState<IGame>(game);
	const { name, release, cover } = gameValues;
	const oldName = useMemo(() => name, []);

	const { requestUpdateGame } = useGames();
	const { sendNotification } = useNotification();
	const dispatch = useDispatch();

	const closeEdit = () => setGameDetails({ gameIndex: 0, isOpen: '' });

	useShortcuts(
		useCallback((e: KeyboardEvent) => {
			e.key === 'Escape' && closeEdit();
		}, [])
	);

	const saveGame = async () => {
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
		setGameDetails({ isOpen: 'details', gameIndex: gameDetails.gameIndex });
		sendNotification('Sucesso', 'Seu jogo foi atualizado');
	};

	return (
		<Container>
			<StyledEditGame>
				<button onClick={() => closeEdit()} className="close">
					x
				</button>

				<div className="data">
					<input className="title" type="text" value={name} onChange={(e) => setGameValues({ ...gameValues, name: e.target.value })} />
					<input type="text" className="info" value={release} onChange={(e) => setGameValues({ ...gameValues, release: e.target.value })} />

					<RateContainer props={{ gameValues, setGameValues }} />
					<FilterContainer props={{ title: 'Tags', filterName: 'tags', gameValues, setGameValues }} />
					<FilterContainer props={{ title: 'Gêneros', filterName: 'genre', gameValues, setGameValues }} />

					<button onClick={() => saveGame()} className="save-button">
						Salvar
					</button>
				</div>

				<div className="image">
					<ImageContainer props={{ gameName: name, imageLink: cover }} />
					<input type="text" className="info" value={cover} onChange={(e) => setGameValues({ ...gameValues, cover: e.target.value })} />
				</div>
			</StyledEditGame>
		</Container>
	);
};
