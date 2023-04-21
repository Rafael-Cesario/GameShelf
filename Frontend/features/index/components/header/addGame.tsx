import { useState } from 'react';
import { StyledAddGame } from '../../styles/styledAddGame';

export const AddGame = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<StyledAddGame>
			<button onClick={() => setIsOpen(true)}>Adicionar novo jogo</button>

			{isOpen && (
				<div className="add-game-container">
					<div className="build-game">
						<h1>Adicionar novo jogo</h1>
						<button className="close" onClick={() => setIsOpen(false)}>
							x
						</button>

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

									<input type="text" className="filter" placeholder="Busque por uma tag" />

									<div className="tags">
										<button className="tag">Tag</button>
										<button className="tag">Adventure</button>
										<button className="tag">Simulation</button>
										<button className="tag active">Tag</button>
										<button className="tag">Tag</button>
										<button className="tag">Tag</button>
										<button className="tag active">Tag</button>
										<button className="tag">Tag</button>
										<button className="tag">Tag</button>
										<button className="tag">Tag</button>
										<button className="tag">Tag</button>
										<button className="tag">Tag</button>
										<button className="tag">Tag</button>
										<button className="tag">Tag</button>
									</div>
								</div>
							</div>

							<div className="image" />
						</div>

						<button className="add-game-button">Criar</button>
					</div>
				</div>
			)}
		</StyledAddGame>
	);
};
