import { useState } from 'react';
import { StyledAddGame } from '../../styles/styledAddGame';
import { useFilters } from '../../hooks/useFilters';
import { Filter } from './filter';
import Image from 'next/image';

export const AddGame = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { genres, tags, rates } = useFilters();

	return (
		<StyledAddGame>
			<button onClick={() => setIsOpen(true)}>Adicionar novo jogo</button>

			{isOpen && (
				<div className="add-game-container">
					<div className="build-game">
						<div className="title">
							<h1>Adicionar novo jogo</h1>
							<button className="close" onClick={() => setIsOpen(false)}>
								x
							</button>
						</div>

						<div className="inputs">
							<div className="data">
								<input className="data-input" type="text" placeholder="Nome" />
								<input className="data-input" type="text" placeholder="Data de lançamento" />
								<input className="data-input" type="text" placeholder="Link para uma imagem" />

								<div className="tag-container">
									<div className="top">
										<h1 className="title">Tags</h1>
										<input type="text" placeholder="Adicionar nova tag" />
										<button>+</button>
									</div>

									<Filter props={{ filterName: 'tags', filters: tags, placeholder: 'Busque por uma tag' }} />
								</div>

								<div className="genre-container">
									<div className="top">
										<h1 className="title">Gêneros</h1>
										<input type="text" placeholder="Adicionar novo gênero" />
										<button>+</button>
									</div>

									<Filter props={{ filterName: 'genres', filters: genres, placeholder: 'Busque por um gênero' }} />
								</div>

								<div className="rate-container">
									<h1 className="title">Nota</h1>

									<div className="rates">
										{rates.map((rate) => (
											<button className="rate" key={rate}>
												{rate}
											</button>
										))}
									</div>
								</div>
							</div>

							<div className="image">
								<Image fill={true} alt="game cover" src={'https://sm.ign.com/t/ign_pt/cover/d/dredge/dredge_d37y.1200.jpg'} />
							</div>
						</div>

						<button className="add-game-button">Criar</button>
					</div>
				</div>
			)}
		</StyledAddGame>
	);
};
