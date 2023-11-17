"use client";
import { client } from "@/services/client";
import { ApolloProvider } from "@apollo/client";
import { Provider as ReduxProvider } from "react-redux";
import StyledComponentsRegistry from "./styled-components";
import { store } from "@/context/store";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<ApolloProvider client={client}>
			<ReduxProvider store={store}>
				<StyledComponentsRegistry>{children}</StyledComponentsRegistry>
			</ReduxProvider>
		</ApolloProvider>
	);
};
