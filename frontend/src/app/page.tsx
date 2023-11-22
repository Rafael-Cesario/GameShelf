import { Notification } from "@/components/notification";
import { Header } from "@/features/home/header";
import { Sidebar } from "@/features/home/sidebar";
import { HomeStyled } from "@/styles/home-styled";

export default function Home() {
	return (
		<HomeStyled>
			<Notification />
			<Sidebar />
			<Header />
			<main>Main</main>
		</HomeStyled>
	);
}
