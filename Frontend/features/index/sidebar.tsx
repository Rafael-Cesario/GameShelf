import { Markers } from './components/sidebar/markers';
import { StyledSidebar } from './styles/styledSidebar';

export const Sidebar = () => {
	return (
		<StyledSidebar>
			<h1 className="title">GameShelf</h1>

			<div className="markers">
				<Markers />
				<button className="new-marker">Criar novo marcador</button>
			</div>
		</StyledSidebar>
	);
};
