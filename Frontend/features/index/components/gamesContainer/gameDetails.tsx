import type { IGameDetails } from '../../gamesContainer';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { StyledGameDetails } from './styles/styledGameDetails';
import { ImageContainer } from '../imageContainer';
import { useShortcuts } from '../../hooks/useShortcuts';
import { useGame } from './hooks/useGame';

interface GameDetailsProps {
	props: {
		gameDetails: IGameDetails;
		setGameDetails: Dispatch<SetStateAction<IGameDetails>>;
	};
}

export const GameDetails = ({ props: { gameDetails, setGameDetails } }: GameDetailsProps) => {
	const { name, release, rate, cover, genre, tags } = useGame(gameDetails.gameIndex);

	const openEditGame = () => {
		setGameDetails({ isOpen: 'edit', gameIndex: gameDetails.gameIndex });
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
						<p className="info">{tags.join(', ')}</p>

						<h2 className="sub-title">Gêneros</h2>
						<p className="info">{genre.join(', ')}</p>
					</div>

					<div className="buttons">
						<button onClick={() => openEditGame()}>Editar</button>
						<button>Excluir</button>
					</div>
				</div>

				<ImageContainer props={{ gameName: name, imageLink: cover }} />
			</div>
		</StyledGameDetails>
	);
};
