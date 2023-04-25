import { Dispatch, SetStateAction, useCallback } from 'react';
import { StyledGameDetails } from './styles/styledGameDetails';
import { ImageContainer } from '../imageContainer';
import { useShortcuts } from '../../hooks/useShortcuts';
import { useGame } from './hooks/useGame';

type ShowDetails = {
	isOpen: boolean;
	gameIndex: number;
};

interface GameDetailsProps {
	props: {
		showDetails: ShowDetails;
		setShowDetails: Dispatch<SetStateAction<ShowDetails>>;
	};
}

export const GameDetails = ({ props: { showDetails, setShowDetails } }: GameDetailsProps) => {
	const { name, release, rate, cover, genre, tags } = useGame(showDetails.gameIndex);

	const closeDetails = useCallback((e: KeyboardEvent) => {
		e.key === 'Escape' && setShowDetails({ isOpen: false, gameIndex: 0 });
	}, []);

	useShortcuts(closeDetails);

	return (
		<StyledGameDetails>
			<div className="details">
				<button className="close" onClick={() => setShowDetails({ isOpen: false, gameIndex: 0 })}>
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
