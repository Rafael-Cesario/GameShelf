import { Dispatch, SetStateAction, useCallback } from 'react';
import { StyledGameDetails } from './styles/styledGameDetails';
import { ImageContainer } from '../imageContainer';
import { useShortcuts } from '../../hooks/useShortcuts';
import { useGame } from './hooks/useGame';

type gameDetails = {
	isOpen: '' | 'details' | 'edit';
	gameIndex: number;
};

interface GameDetailsProps {
	props: {
		gameDetails: gameDetails;
		setGameDetails: Dispatch<SetStateAction<gameDetails>>;
	};
}

export const GameDetails = ({ props: { gameDetails: showDetails, setGameDetails: setShowDetails } }: GameDetailsProps) => {
	const { name, release, rate, cover, genre, tags } = useGame(showDetails.gameIndex);

	const closeDetails = useCallback((e: KeyboardEvent) => {
		e.key === 'Escape' && setShowDetails({ isOpen: '', gameIndex: 0 });
	}, []);

	useShortcuts(closeDetails);

	return (
		<StyledGameDetails>
			<div className="details">
				<button className="close" onClick={() => setShowDetails({ isOpen: '', gameIndex: 0 })}>
					x
				</button>

				<div className="data">
					<div>
						<h1 className="title">{name}</h1>
						<p className="info">{release}</p>
						<p className="info">Nota: {rate}</p>

						<h2 className="sub-title">Tags</h2>
						<p className="info">{tags.join(', ')}</p>

						<h2 className="sub-title">Gêneros</h2>
						<p className="info">{genre.join(', ')}</p>
					</div>

					<div className="buttons">
						<button>Editar</button>
						<button>Excluir</button>
					</div>
				</div>

				<ImageContainer props={{ gameName: name, imageLink: cover }} />
			</div>
		</StyledGameDetails>
	);
};
