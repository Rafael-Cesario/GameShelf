import { CreateMarker } from './components/sidebar/createMarker';
import { Markers } from './components/sidebar/markers';
import { StyledSidebar } from './styles/styledSidebar';

export const Sidebar = () => {
	return (
		<StyledSidebar>
			<h1 className="title">GameShelf</h1>

			<div className="markers">
				<Markers />
				<CreateMarker />
			</div>
		</StyledSidebar>
	);
};
