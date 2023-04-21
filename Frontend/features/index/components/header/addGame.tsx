import { useState } from 'react';
import { StyledAddGame } from '../../styles/styledAddGame';
import { Title } from './addGame/title';
import { ImageContainer } from './addGame/image';
import { FilterContainer } from './addGame/filterContainer';
import { RateContainer } from './addGame/rateContainer';
import { Field } from './addGame/field';

export const AddGame = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<StyledAddGame>
			<button onClick={() => setIsOpen(true)}>Adicionar novo jogo</button>

			{isOpen && (
				<div className="add-game-container">
					<div className="build-game">
						<Title setIsOpen={setIsOpen} />

						<div className="inputs">
							<div className="data">
								<Field placeholder="Nome" />
								<Field placeholder="Data de lançamento" />
								<Field placeholder="Link para uma imagem" />

								<FilterContainer props={{ title: 'Tags', filterName: 'tags' }} />
								<FilterContainer props={{ title: 'Gêneros', filterName: 'genres' }} />
								<RateContainer />
							</div>

							<ImageContainer />
						</div>

						<button className="add-game-button">Criar</button>
					</div>
				</div>
			)}
		</StyledAddGame>
	);
};
