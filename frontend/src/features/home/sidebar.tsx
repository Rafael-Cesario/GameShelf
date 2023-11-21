import { SidebarStyled } from "./styles/sidebar-styled";

export const Sidebar = () => {
	return (
		<SidebarStyled>
			<div>
				<h1 className="title">GameShelf</h1>
				<input type="text" placeholder="Buscar coleção" className="search-collection" />
				<div className="collection-container">
					<div className="collection">
						<button className="active">Collection 01</button>
						<span className="amount">978</span>
					</div>
					<div className="collection">
						<button>Collection 02</button>
						<span className="amount">978</span>
					</div>
				</div>
				<button className="create-collection">Criar nova coleção</button>
			</div>

			<button className="logout">Sair da conta</button>
		</SidebarStyled>
	);
};
