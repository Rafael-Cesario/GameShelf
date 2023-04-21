import { useState } from 'react';
import { StyledAddGame } from '../../styles/styledAddGame';
import { Title } from './addGame/title';
import { ImageContainer } from './addGame/image';
import { FilterContainer } from './addGame/filterContainer';
import { RateContainer } from './addGame/rateContainer';
import { Field } from './addGame/field';
import { IGame } from '@/interfaces/IGames';

const defaultGameValues: IGame = {
	name: '',
	release: '',
	cover: '',
	rate: '',
	genre: [],
	tags: [],
};

export const AddGame = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [gameValues, setGameValues] = useState(defaultGameValues);

	return (
		<StyledAddGame>
			<button onClick={() => setIsOpen(true)}>Adicionar novo jogo</button>

			{isOpen && (
				<div className="add-game-container">
					<div className="build-game">
						<Title setIsOpen={setIsOpen} />

						<div className="inputs">
							<div className="data">
								<Field props={{ placeholder: 'Nome', gameValues, setGameValues }} />
								<Field props={{ placeholder: 'Data de lançamento', gameValues, setGameValues }} />
								<Field props={{ placeholder: 'Link para uma imagem', gameValues, setGameValues }} />

								<FilterContainer props={{ title: 'Tags', filterName: 'tags', gameValues, setGameValues }} />
								<FilterContainer props={{ title: 'Gêneros', filterName: 'genres', gameValues, setGameValues }} />
								<RateContainer props={{ gameValues, setGameValues }} />
							</div>

							<ImageContainer props={{ imageLink: gameValues.cover }} />
						</div>

						<button className="add-game-button">Criar</button>
					</div>
				</div>
			)}
		</StyledAddGame>
	);
};
