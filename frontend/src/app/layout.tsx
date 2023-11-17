import type { Metadata } from "next";
import { Providers } from "@/lib/providers";
import { GlobalStyled } from "@/styles/global-styled";
import { Roboto_Slab } from "next/font/google";
import { cookies } from "next/headers";
import { CookiesName } from "./api/cookies/route";

const roboto_slab = Roboto_Slab({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "GameShelf",
	description: "Organize your games",
};

export default function RootLayout({ children, authentication }: { children: React.ReactNode; authentication: React.ReactNode }) {
	const store = cookies();
	const cookieName: CookiesName = "user";
	const user = !!store.get(cookieName);

	return (
		<html lang="pt-br">
			<body className={roboto_slab.className}>
				<Providers>
					<GlobalStyled />
					{user || authentication}
					{user && children}
				</Providers>
			</body>
		</html>
	);
}
