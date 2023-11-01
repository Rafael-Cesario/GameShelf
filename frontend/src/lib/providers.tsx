"use client";
import { client } from "@/services/client";
import { ApolloProvider } from "@apollo/client";
import StyledComponentsRegistry from "./registry";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<ApolloProvider client={client}>
			<StyledComponentsRegistry>{children}</StyledComponentsRegistry>
		</ApolloProvider>
	);
};
