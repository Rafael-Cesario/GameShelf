import StyledComponentsRegistry from "@/lib/styled-components";
import { GlobalStyled } from "@/styles/global-styled";
import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";

const roboto_slab = Roboto_Slab({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "GameShelf",
	description: "Organize your games",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-br">
			<body className={roboto_slab.className}>
				<StyledComponentsRegistry>
					<GlobalStyled />
					{children}
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}
