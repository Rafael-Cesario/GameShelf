import { StyledMarkers } from '../../styles/styledMarkers';

export const Markers = () => {
	return (
		<StyledMarkers className="markers">
			<ul>
				<li>Todos</li>
				<li>Wishlist</li>
				<li className="active">zerados</li>
				<li>favoritos</li>
				<li>Melhores</li>
			</ul>

			<button className="new-marker">Criar novo marcador</button>
		</StyledMarkers>
	);
};
