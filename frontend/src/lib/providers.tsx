"use client";
import { client } from "@/services/client";
import { ApolloProvider } from "@apollo/client";
import StyledComponentsRegistry from "./styled-components";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<ApolloProvider client={client}>
			<StyledComponentsRegistry>{children}</StyledComponentsRegistry>
		</ApolloProvider>
	);
};
