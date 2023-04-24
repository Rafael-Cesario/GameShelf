import { Store } from '@/context/store';
import { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { StyledGameDetails } from './styles/styledGameDetails';
import { ImageContainer } from '../imageContainer';

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
	const { games } = useSelector((state: Store) => state.games);
	const { name, release, rate, cover, genre, tags } = games[showDetails.gameIndex];

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
