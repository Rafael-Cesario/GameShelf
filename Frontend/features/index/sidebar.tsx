import { CreateMarker } from './components/sidebar/createMarker';
import { MarkerConfigs } from './components/sidebar/markerConfigs';
import { MarkerSearch } from './components/sidebar/markerSearch';
import { Markers } from './components/sidebar/markers';
import { StyledSidebar } from './styles/styledSidebar';

export const Sidebar = () => {
	return (
		<StyledSidebar>
			<div>
				<h1 className="title">GameShelf</h1>
				<MarkerSearch />
				<Markers />
			</div>

			<div className="buttons">
				<CreateMarker />
				<MarkerConfigs />
			</div>
		</StyledSidebar>
	);
};
