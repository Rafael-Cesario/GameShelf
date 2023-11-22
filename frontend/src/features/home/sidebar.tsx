import { cookies } from "next/headers";
import { CollectionContainer } from "./components/sidebar/collection-container";
import { CreateCollection } from "./components/sidebar/create-collection";
import { SidebarStyled } from "./styles/sidebar-styled";
import { UserCookies } from "@/services/interfaces/cookies";
import { SearchCollection } from "./components/sidebar/search-collection";
import { LogoutButton } from "./components/sidebar/logoutButton";

export const Sidebar = () => {
	const store = cookies();
	const cookie = store.get("user");
	const { id }: UserCookies = JSON.parse(cookie?.value || "");

	return (
		<SidebarStyled className="sidebar">
			<div>
				<h1 className="title">GameShelf</h1>
				<SearchCollection />
				<CollectionContainer userID={id} />
				<CreateCollection />
			</div>

			<LogoutButton />
		</SidebarStyled>
	);
};
