"use client";
import { client } from "@/services/client";
import { ApolloProvider } from "@apollo/client";
import { Provider as ReduxProvider } from "react-redux";
import StyledComponentsRegistry from "./registry";
import { store } from "@/context/store";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<ReduxProvider store={store}>
			<ApolloProvider client={client}>
				<StyledComponentsRegistry>{children}</StyledComponentsRegistry>
			</ApolloProvider>
		</ReduxProvider>
	);
};
