import { CollectionContainer } from "./components/collection-container";
import { CreateCollection } from "./components/create-collection";
import { SidebarStyled } from "./styles/sidebar-styled";

export const Sidebar = () => {
	return (
		<SidebarStyled>
			<div>
				<h1 className="title">GameShelf</h1>
				<input type="text" placeholder="Buscar coleção" className="search-collection" />

				<CollectionContainer />
				<CreateCollection />
			</div>

			<button className="logout">Sair da conta</button>
		</SidebarStyled>
	);
};
