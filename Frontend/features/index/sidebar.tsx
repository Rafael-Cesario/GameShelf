import { StyledSidebar } from './styles/styledSidebar';

export const Sidebar = () => {
	return (
		<StyledSidebar>
			<h1 className="title">GameShelf</h1>

			<div className="markers">
				<ul>
					<li>Todos</li>
					<li>Wishlist</li>
					<li className="active">zerados</li>
					<li>favoritos</li>
					<li>Melhores</li>
				</ul>

				<button className="new-marker">+ Criar novo marcador</button>
			</div>
		</StyledSidebar>
	);
};
