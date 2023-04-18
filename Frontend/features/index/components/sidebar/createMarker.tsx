import { useState } from 'react';
import { StyledCreateMarker } from '../../styles/styledCreateMarker';

export const CreateMarker = () => {
	const [showBuildMarker, setShowBuildMarker] = useState(false);

	return (
		<StyledCreateMarker>
			<button onClick={() => setShowBuildMarker(!showBuildMarker)} className="new-marker">
				Criar novo marcador
			</button>

			{showBuildMarker && (
				<div className="container">
					<div className="build-marker">
						<div className="title">
							<h1>Novo marcador</h1>
							<button className="close">x</button>
						</div>

						<input className="name" type="text" placeholder="Nome" />

						<h2>Tags</h2>
						<div className="tags">
							<button>Favoritos</button>
							<button>Zerados</button>
							<button>Wishlist</button>
						</div>

						<h2>Genêros</h2>
						<div className="genre">
							<button>ação</button>
							<button>RPG</button>
							<button>Luta</button>
						</div>

						<h2>Nota</h2>
						<div className="rate">
							<button>Ruim</button>
							<button>Normal</button>
							<button>Bom</button>
							<button>Ótimo</button>
						</div>

						<button>Criar</button>
					</div>
				</div>
			)}
		</StyledCreateMarker>
	);
};
