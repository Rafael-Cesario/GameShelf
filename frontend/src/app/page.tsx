import { Notification } from "@/components/notification";
import { Header } from "@/features/home/header";
import { Main } from "@/features/home/main";
import { Sidebar } from "@/features/home/sidebar";
import { HomeStyled } from "@/styles/home-styled";

export default function Home() {
	return (
		<HomeStyled>
			<Notification />
			<Sidebar />
			<Header />
			<Main />
		</HomeStyled>
	);
}
