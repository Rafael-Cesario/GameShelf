import { cookies } from "next/headers";
import { CollectionContainer } from "./components/collection-container";
import { CreateCollection } from "./components/create-collection";
import { SidebarStyled } from "./styles/sidebar-styled";
import { UserCookies } from "@/services/interfaces/cookies";
import { SearchCollection } from "./components/search-collection";

export const Sidebar = () => {
	const store = cookies();
	const cookie = store.get("user");
	const { id }: UserCookies = JSON.parse(cookie?.value || "");

	return (
		<SidebarStyled>
			<div>
				<h1 className="title">GameShelf</h1>
				<SearchCollection />
				<CollectionContainer userID={id} />
				<CreateCollection />
			</div>

			<button className="logout">Sair da conta</button>
		</SidebarStyled>
	);
};
