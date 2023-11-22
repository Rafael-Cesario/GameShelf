import { Notification } from "@/components/notification";
import { Sidebar } from "@/features/home/sidebar";
import { HomeStyled } from "@/styles/home-styled";

export default function Home() {
	return (
		<HomeStyled>
			<Notification />
			<Sidebar />

			<main>
				<header>Header</header>
				Main
			</main>
		</HomeStyled>
	);
}
