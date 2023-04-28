import type { IGameDetails } from '../../gamesContainer';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { StyledGameDetails } from './styles/styledGameDetails';
import { ImageContainer } from '../imageContainer';
import { useShortcuts } from '../../hooks/useShortcuts';
import { useGame } from './hooks/useGame';
import { useGames } from '../../hooks/useGames';
import { StorageUser, storageKeys } from '@/interfaces/interfaceStorageKeys';
import { useNotification } from '@/utils/useNotification';
import { useDispatch } from 'react-redux';
import { sliceGames } from '../../slices/games';

interface GameDetailsProps {
	props: {
		gameDetails: IGameDetails;
		setGameDetails: Dispatch<SetStateAction<IGameDetails>>;
	};
}

export const GameDetails = ({ props: { gameDetails, setGameDetails } }: GameDetailsProps) => {
	const { name, release, rate, cover, genre, tags } = useGame(gameDetails.gameIndex);
	const [showDeleteButton, setShowDeleteButton] = useState(false);

	const dispatch = useDispatch();
	const { sendNotification } = useNotification();
	const { requestRemoveGame } = useGames();

	const openEditGame = () => {
		setGameDetails({ isOpen: 'edit', gameIndex: gameDetails.gameIndex });
	};

	const deleteGame = async () => {
		const storage = localStorage.getItem(storageKeys.user);
		const { email } = JSON.parse(storage || '') as StorageUser;

		const { data, error } = await requestRemoveGame({
			removeGame: {
				email,
				gameName: name,
			},
		});

		if (error || !data) return sendNotification('Erro', 'Um error ocorreu ao remover seu jogo, por favor recarregue a página e tente novamente');

		setGameDetails({ isOpen: '', gameIndex: 0 });
		sendNotification('Sucesso', `Seu jogo ${name} foi removido.`);

		dispatch(sliceGames.actions.setGames({ games: data }));
	};

	const closeDetails = useCallback((e: KeyboardEvent) => {
		e.key === 'Escape' && setGameDetails({ isOpen: '', gameIndex: 0 });
	}, []);

	useShortcuts(closeDetails);

	return (
		<StyledGameDetails>
			<div className="details">
				<button role="close-details" className="close" onClick={() => setGameDetails({ isOpen: '', gameIndex: 0 })}>
					x
				</button>

				<div className="data">
					<div>
						<h1 role="game-name" className="title">
							{name}
						</h1>
						<p className="info">{release}</p>
						<p className="info">Nota: {rate}</p>

						<h2 className="sub-title">Tags</h2>
						<p className="info">{tags?.join(', ')}</p>

						<h2 className="sub-title">Gêneros</h2>
						<p className="info">{genre?.join(', ')}</p>
					</div>

					<div className="buttons">
						<button onClick={() => openEditGame()} role="edit-game">
							Editar
						</button>

						{showDeleteButton || (
							<button role="delete-game" onClick={() => setShowDeleteButton(true)}>
								Excluir
							</button>
						)}

						{showDeleteButton && (
							<button role="delete-game-confirm" onClick={() => deleteGame()} autoFocus={true} onBlur={() => setShowDeleteButton(false)}>
								Clique novamente para remover seu jogo, ou clique fora para cancelar
							</button>
						)}
					</div>
				</div>

				<ImageContainer props={{ gameName: name, imageLink: cover }} />
			</div>
		</StyledGameDetails>
	);
};
