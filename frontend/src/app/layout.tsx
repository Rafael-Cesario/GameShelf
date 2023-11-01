import type { Metadata } from "next";
import { Providers } from "@/lib/providers";
import { StyledGlobal } from "@/styles/styled-global";
import { Roboto_Slab } from "next/font/google";
import { Notification } from "@/components/notification";

const roboto_slab = Roboto_Slab({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "GameShelf",
	description: "GameShelf",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-br">
			<body className={roboto_slab.className}>
				<Providers>
					<StyledGlobal />
					<Notification />
					{children}
				</Providers>
			</body>
		</html>
	);
}
